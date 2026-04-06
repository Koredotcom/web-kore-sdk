/**
 * Pre-compile jQuery Templates
 *
 * Extracts jQuery template markup from source files and compiles them into
 * static JavaScript functions at build time. The compiled functions use
 * variable declarations for data access, making them
 * compatible and bundleable by webpack.
 *
 * Output: src/libs/precompiled-templates.js (imported by korejquery.js)
 *
 * Usage: node scripts/precompile-templates.js
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '..', 'src');

// ============================================================
// Template tag definitions (from korejquery.js)
// ============================================================
const tmplTags = {
  "tmpl": {
    _default: { $2: "null" },
    open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
  },
  "wrap": {
    _default: { $2: "null" },
    open: "$item.calls(__,$1,$2);__=[];",
    close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
  },
  "each": {
    _default: { $2: "$index, $value" },
    open: "if($notnull_1){$.each($1a,function($2){",
    close: "});}",
  },
  "if": {
    open: "if(($notnull_1) && $1a){",
    close: "}"
  },
  "else": {
    _default: { $1: "true" },
    open: "}else if(($notnull_1) && $1a){"
  },
  "html": {
    open: "if($notnull_1){__.push($1a);}"
  },
  "=": {
    _default: { $1: "$data" },
    open: "if($notnull_1){__.push($.encode($1a));}"
  },
  "!": {
    open: ""
  }
};

// ============================================================
// Known identifiers that should NOT get var declarations
// ============================================================
const KNOWN_IDENTIFIERS = new Set([
  // Template function locals
  'jQuery', '$', '$item', '$data', 'call', '__',
  // Each callback defaults
  '$index', '$value',
  // JS keywords and literals
  'undefined', 'null', 'true', 'false', 'NaN', 'Infinity',
  'this', 'void', 'typeof', 'instanceof', 'new', 'delete', 'in',
  'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break',
  'continue', 'return', 'throw', 'try', 'catch', 'finally', 'var',
  'let', 'const', 'function', 'class', 'of',
  // JS built-in objects
  'JSON', 'Math', 'parseInt', 'parseFloat', 'String', 'Number',
  'Boolean', 'Array', 'Object', 'Date', 'RegExp', 'Error',
  'Map', 'Set', 'Promise', 'Symbol', 'Float32Array', 'Float64Array',
  'encodeURIComponent', 'decodeURIComponent', 'encodeURI', 'decodeURI',
  'isNaN', 'isFinite', 'unescape',
  // Browser globals
  'window', 'document', 'console', 'self', 'globalThis',
  'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
  'alert', 'confirm', 'prompt', 'navigator', 'location',
]);

// ============================================================
// Extract top-level data variable names from template markup
// ============================================================
function extractDataVariables(markup) {
  const variables = new Set();

  // Collect {{each}} callback parameter names (these are local variables)
  const eachParams = new Set();
  const eachRegex = /\{\{each\(([^)]*)\)/g;
  let em;
  while ((em = eachRegex.exec(markup)) !== null) {
    em[1].split(',').map(s => s.trim()).filter(Boolean).forEach(p => eachParams.add(p));
  }

  // Find all template expressions: ${expr}, {{if expr}}, {{each(...) expr}}, {{= expr}}, {{html expr}}
  const expressions = [];

  // ${expr} patterns
  const dollarRegex = /\$\{([^\}]*)\}/g;
  let m;
  while ((m = dollarRegex.exec(markup)) !== null) {
    expressions.push(m[1]);
  }

  // {{tag expr}} patterns — extract the target expression from each tag
  const tagRegex = /\{\{(?:\/?)(?:\w+|.)(?:\((?:[^\}]|\}(?!\}))*?\))?\s+(.*?)(?:\((?:[^\}]|\}(?!\}))*?\))?\s*\}\}/g;
  while ((m = tagRegex.exec(markup)) !== null) {
    if (m[1]) expressions.push(m[1].trim());
  }

  // Extract root identifiers from each expression
  // A root identifier is the first part of a dot-chain: msgData.type => msgData
  for (const expr of expressions) {
    // Find all identifier tokens (not preceded by . and not inside strings)
    let i = 0;
    while (i < expr.length) {
      const ch = expr[i];

      // Skip string literals
      if (ch === '"' || ch === "'") {
        const q = ch;
        i++;
        while (i < expr.length && expr[i] !== q) {
          if (expr[i] === '\\') i++;
          i++;
        }
        i++;
        continue;
      }

      // Match identifiers
      if (/[a-zA-Z_$]/.test(ch)) {
        const start = i;
        let ident = '';
        while (i < expr.length && /[a-zA-Z0-9_$]/.test(expr[i])) {
          ident += expr[i];
          i++;
        }

        // Skip if preceded by . (it's a property access, not a root var)
        if (start > 0 && expr[start - 1] === '.') continue;

        // Skip known identifiers and each params
        if (KNOWN_IDENTIFIERS.has(ident)) continue;
        if (eachParams.has(ident)) continue;

        variables.add(ident);
        continue;
      }

      i++;
    }
  }

  return variables;
}

// ============================================================
// buildTmplFnBody
//
// Compiles template markup into a function body string.
// Uses var declarations (var msgData=$data.msgData, ...) to make
// data properties accessible as local variables in the compiled output.
// ============================================================
function buildTmplFnBody(markup) {
  // Step 1: Extract data variable names from template markup
  const dataVars = extractDataVariables(markup);

  // Step 2: Compile the template markup (same regex logic as original buildTmplFn)
  const compiled = markup.trim()
    .replace(/([\\'])/g, "\\$1")
    .replace(/[\r\t\n]/g, " ")
    .replace(/\$\{([^\}]*)\}/g, "{{= $1}}")
    .replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
      function (all, slash, type, fnargs, target, parens, args) {
        const tag = tmplTags[type];
        if (!tag) {
          throw new Error("Unknown template tag: " + type);
        }
        const def = tag._default || [];
        if (parens && !/\w$/.test(target)) {
          target += parens;
          parens = "";
        }
        let expr, exprAutoFnDetect;
        if (target) {
          target = unescape(target);
          args = args ? ("," + unescape(args) + ")") : (parens ? ")" : "");
          expr = parens ? (target.indexOf(".") > -1 ? target + unescape(parens) : ("(" + target + ").call($item" + args)) : target;
          exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
        } else {
          exprAutoFnDetect = expr = def.$1 || "null";
        }
        fnargs = unescape(fnargs);
        return "');" +
          tag[slash ? "close" : "open"]
            .split("$notnull_1").join(target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true")
            .split("$1a").join(exprAutoFnDetect)
            .split("$1").join(expr)
            .split("$2").join(fnargs || def.$2 || "") +
          "__.push('";
      });

  // Step 3: Generate variable declarations for data access
  let varDeclarations = '';
  if (dataVars.size > 0) {
    const decls = Array.from(dataVars).map(v => `${v}=$data.${v}`).join(',');
    varDeclarations = `var ${decls};`;
  }

  // Step 4: Return function body with var declarations for data access
  return "var $=jQuery,call,__=[],$data=$item.data;" +
    varDeclarations +
    "__.push('" + compiled + "');return __;";
}

// ============================================================
// Template extraction from source files
// ============================================================

/**
 * Clean template markup extracted from JS string literals.
 */
function cleanMarkup(raw) {
  let markup = raw;

  // Remove JS string line continuations
  markup = markup.replace(/\\\n/g, '');
  markup = markup.replace(/\\\r\n/g, '');

  // Remove string concatenation patterns
  markup = markup.replace(/['"`]\s*\+\s*['"`]/g, '');

  // Unescape JS string escapes (process \\ first as placeholder)
  markup = markup.replace(/\\\\/g, '\x00BACKSLASH\x00');
  markup = markup.replace(/\\'/g, "'");
  markup = markup.replace(/\\"/g, '"');
  markup = markup.replace(/\\n/g, '\n');
  markup = markup.replace(/\\t/g, '\t');
  markup = markup.replace(/\\r/g, '\r');
  markup = markup.replace(/\x00BACKSLASH\x00/g, '\\');

  return markup;
}

/**
 * Extract templates from a source file.
 */
function extractTemplates(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const templates = [];

  const scriptTagRegex = /<script\s+id=(?:\\?["'])([^"'\\]+)(?:\\?["'])\s+type=(?:\\?["'])text\/x-jq(?:ury|uery)-tmpl(?:\\?["'])\s*>/g;

  let match;
  while ((match = scriptTagRegex.exec(content)) !== null) {
    const templateId = match[1];
    const startIdx = match.index + match[0].length;

    // Find closing tag — handles both </script> and </scipt> (typo in codebase)
    let endIdx = -1;
    const closeTags = ['</script>', '</scipt>'];
    for (const closeTag of closeTags) {
      const idx = content.indexOf(closeTag, startIdx);
      if (idx !== -1 && (endIdx === -1 || idx < endIdx)) {
        endIdx = idx;
      }
    }
    if (endIdx === -1) {
      console.warn(`  WARNING: No closing tag for template "${templateId}" in ${filePath}`);
      continue;
    }

    let markup = content.substring(startIdx, endIdx);
    markup = cleanMarkup(markup);
    templates.push({ id: templateId, markup, file: filePath });
  }

  return templates;
}

// ============================================================
// Scan all template source files
// ============================================================
function findTemplateFiles() {
  const files = [];

  files.push(path.join(SRC_DIR, 'components', 'widgets', 'kore-widgets.ts'));
  files.push(path.join(SRC_DIR, 'plugins', 'v2WidgetsPlugin', 'v2-kore-widgets.ts'));
  files.push(path.join(SRC_DIR, 'components', 'chatwindow', 'chatWindow.ts'));

  const v2TemplatesDir = path.join(SRC_DIR, 'plugins', 'v2Plugin', 'templates');
  if (fs.existsSync(v2TemplatesDir)) {
    scanDirectory(v2TemplatesDir, files);
  }

  files.push(path.join(SRC_DIR, 'plugins', 'searchSuggestions', 'searchSuggestions.ts'));

  const solutionsDir = path.join(SRC_DIR, 'plugins', 'solutions', 'templates');
  if (fs.existsSync(solutionsDir)) {
    scanDirectory(solutionsDir, files);
  }

  return files.filter(f => fs.existsSync(f));
}

function scanDirectory(dir, files) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath, files);
    } else if (/\.(ts|js)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
}

// ============================================================
// Main
// ============================================================
function main() {
  console.log('Pre-compiling jQuery templates...\n');

  const templateFiles = findTemplateFiles();
  const allTemplates = new Map();
  let errors = 0;

  for (const filePath of templateFiles) {
    const relativePath = path.relative(path.resolve(__dirname, '..'), filePath);
    const templates = extractTemplates(filePath);

    for (const tmpl of templates) {
      if (allTemplates.has(tmpl.id)) {
        continue; // Skip duplicates
      }

      try {
        const fnBody = buildTmplFnBody(tmpl.markup);

        // Validate the compiled function body
        new Function("jQuery", "$item", fnBody);

        allTemplates.set(tmpl.id, {
          file: relativePath,
          fnBody: fnBody
        });
        console.log(`  ✓ ${tmpl.id} (${relativePath})`);
      } catch (err) {
        console.error(`  ✗ ${tmpl.id} (${relativePath}): ${err.message}`);
        errors++;
      }
    }
  }

  if (errors > 0) {
    console.error(`\n${errors} template(s) failed to compile.`);
    process.exit(1);
  }

  // Generate output — importable module with precompiled template functions
  const OUTPUT_FILE = path.resolve(SRC_DIR, 'libs', 'precompiled-templates.js');

  let output = '// @ts-nocheck\n';
  output += '/* eslint-disable */\n';
  output += '// Auto-generated by scripts/precompile-templates.js\n';
  output += '// Do not edit manually. Re-run: npm run precompile-templates\n';
  output += '// Uses var declarations for data property access.\n\n';
  output += 'var precompiledTemplates = {\n';

  const entries = Array.from(allTemplates.entries());
  for (let i = 0; i < entries.length; i++) {
    const [id, data] = entries[i];
    const comma = i < entries.length - 1 ? ',' : '';
    output += `  "${id}": function(jQuery, $item) {\n`;
    output += `    ${data.fnBody}\n`;
    output += `  }${comma}\n`;
  }

  output += '};\n\n';
  output += 'module.exports = precompiledTemplates;\n';

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

  console.log(`\nCompiled ${allTemplates.size} templates -> ${path.relative(path.resolve(__dirname, '..'), OUTPUT_FILE)}`);
  console.log('Done.');
}

main();

#!/usr/bin/env node
/**
 * Generate pre-compiled custom jQuery templates for the Kore Web SDK.
 *
 * The Web SDK runs with no new Function in the korejquery.js file, so
 * jQuery templates cannot be compiled in the browser at runtime. This script
 * compiles your custom templates ahead of time into pre-compiled templates.
 *
 * Input  : a file that exports an array of templates:
 *            module.exports = [
 *              { id: 'my_custom_tmpl', markup: '<div>${msgData.title}</div>' },
 *              { id: 'other_tmpl',     markupFile: './templates/other.html' }
 *            ];
 * Output : a single file exporting { [id]: function(jQuery, $item) {...} },
 *          usable via import or window.koreCustomPrecompiledTemplates (CDN URLs script tag).
 *
 * Usage:
 *   node scripts/generate-custom-templates.js [file] [-o outFile]
 *   # defaults: file = ./custom-templates.js, outFile = ./custom-precompiled-templates.js
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// jQuery template pre-compile core
// ============================================================
const tmplTags = {
  "tmpl": { _default: { $2: "null" }, open: "if($notnull_1){__=__.concat($item.nest($1,$2));}" },
  "wrap": { _default: { $2: "null" }, open: "$item.calls(__,$1,$2);__=[];", close: "call=$item.calls();__=call._.concat($item.wrap(call,__));" },
  "each": { _default: { $2: "$index, $value" }, open: "if($notnull_1){$.each($1a,function($2){", close: "});}" },
  "if":   { open: "if(($notnull_1) && $1a){", close: "}" },
  "else": { _default: { $1: "true" }, open: "}else if(($notnull_1) && $1a){" },
  "html": { open: "if($notnull_1){__.push($1a);}" },
  "=":    { _default: { $1: "$data" }, open: "if($notnull_1){__.push($.encode($1a));}" },
  "!":    { open: "" }
};

const KNOWN_IDENTIFIERS = new Set([
  'jQuery', '$', '$item', '$data', 'call', '__',
  '$index', '$value',
  'undefined', 'null', 'true', 'false', 'NaN', 'Infinity',
  'this', 'void', 'typeof', 'instanceof', 'new', 'delete', 'in',
  'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break',
  'continue', 'return', 'throw', 'try', 'catch', 'finally', 'var',
  'let', 'const', 'function', 'class', 'of',
  'JSON', 'Math', 'parseInt', 'parseFloat', 'String', 'Number',
  'Boolean', 'Array', 'Object', 'Date', 'RegExp', 'Error',
  'Map', 'Set', 'Promise', 'Symbol', 'Float32Array', 'Float64Array',
  'encodeURIComponent', 'decodeURIComponent', 'encodeURI', 'decodeURI',
  'isNaN', 'isFinite', 'unescape',
  'window', 'document', 'console', 'self', 'globalThis',
  'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
  'alert', 'confirm', 'prompt', 'navigator', 'location',
]);

function extractDataVariables(markup) {
  const variables = new Set();

  const eachParams = new Set();
  const eachRegex = /\{\{each\(([^)]*)\)/g;
  let em;
  while ((em = eachRegex.exec(markup)) !== null) {
    em[1].split(',').map(s => s.trim()).filter(Boolean).forEach(p => eachParams.add(p));
  }

  const expressions = [];

  const dollarRegex = /\$\{([^\}]*)\}/g;
  let m;
  while ((m = dollarRegex.exec(markup)) !== null) {
    expressions.push(m[1]);
  }

  const tagRegex = /\{\{(?:\/?)(?:\w+|.)(?:\((?:[^\}]|\}(?!\}))*?\))?\s+(.*?)(?:\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g;
  while ((m = tagRegex.exec(markup)) !== null) {
    if (m[1]) expressions.push(m[1].trim());
    if (m[2]) expressions.push(m[2].trim());
  }

  for (const expr of expressions) {
    let i = 0;
    while (i < expr.length) {
      const ch = expr[i];
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
      if (/[a-zA-Z_$]/.test(ch)) {
        const start = i;
        let ident = '';
        while (i < expr.length && /[a-zA-Z0-9_$]/.test(expr[i])) {
          ident += expr[i];
          i++;
        }
        if (start > 0 && expr[start - 1] === '.') continue;
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

function unescape(s) {
  return s ? s.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null;
}

function buildTmplFnBody(markup) {
  const dataVars = extractDataVariables(markup);

  const compiled = markup.trim()
    .replace(/([\\'])/g, "\\$1")
    .replace(/[\r\t\n]/g, " ")
    .replace(/\$\{([^\}]*)\}/g, "{{= $1}}")
    .replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
      function (all, slash, type, fnargs, target, parens, args) {
        const tag = tmplTags[type];
        if (!tag) throw new Error("Unknown template tag: " + type);
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

  let varDeclarations = '';
  if (dataVars.size > 0) {
    const decls = Array.from(dataVars).map(v => `${v}=$data.${v}`).join(',');
    varDeclarations = `var ${decls};`;
  }

  return "var $=jQuery,call,__=[],$data=$item.data;" +
    varDeclarations +
    "__.push('" + compiled + "');return __;";
}

// ============================================================
// Read template markup from a <script>...</script> block if present,
// otherwise treat the string as raw markup.
// ============================================================
function readMarkup(raw) {
  const scriptMatch = raw.match(/<script\b[^>]*>([\s\S]*?)<\/sc(?:r)?ipt>/i);
  return scriptMatch ? scriptMatch[1] : raw;
}

function main() {
  const argv = process.argv.slice(2);
  let configArg = null;
  let outArg = null;
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '-o' || argv[i] === '--out') outArg = argv[++i];
    else if (!argv[i].startsWith('-')) configArg = argv[i];
  }

  const configFile = path.resolve(process.cwd(), configArg || 'custom-templates.js');
  const outFile = path.resolve(process.cwd(), outArg || 'custom-precompiled-templates.js');

  if (!fs.existsSync(configFile)) {
    console.error(`Error: config file not found: ${configFile}`);
    console.error('Create one exporting an array of { id, markup } (or { id, markupFile }).');
    process.exit(1);
  }

  const list = require(configFile);
  if (!Array.isArray(list)) {
    console.error(`Error: ${configFile} must export an array of templates.`);
    process.exit(1);
  }

  console.log(`Compiling ${list.length} custom template(s)...\n`);

  const entries = [];
  const seen = new Set();
  let errors = 0;

  for (const tmpl of list) {
    if (!tmpl || !tmpl.id) {
      console.error('  ✗ template entry missing "id"');
      errors++;
      continue;
    }
    if (seen.has(tmpl.id)) {
      console.error(`  ✗ ${tmpl.id}: duplicate id`);
      errors++;
      continue;
    }
    let raw = tmpl.markup;
    if (!raw && tmpl.markupFile) {
      raw = fs.readFileSync(path.resolve(path.dirname(configFile), tmpl.markupFile), 'utf-8');
    }
    if (!raw) {
      console.error(`  ✗ ${tmpl.id}: no "markup" or "markupFile"`);
      errors++;
      continue;
    }
    try {
      const fnBody = buildTmplFnBody(readMarkup(raw));
      new Function('jQuery', '$item', fnBody); // syntax-check
      entries.push(`  "${tmpl.id}": function(jQuery, $item) {\n    ${fnBody}\n  }`);
      seen.add(tmpl.id);
      console.log(`  ✓ ${tmpl.id}`);
    } catch (err) {
      console.error(`  ✗ ${tmpl.id}: ${err.message}`);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`\n${errors} template(s) failed to compile.`);
    process.exit(1);
  }

  let output = '// Auto-generated by scripts/generate-custom-templates.js\n';
  output += '// Do not edit manually. Re-run the script to regenerate.\n';
  output += '(function (root) {\n';
  output += '  var customPrecompiledTemplates = {\n';
  output += entries.join(',\n') + '\n';
  output += '  };\n';
  output += '  if (typeof module !== "undefined" && module.exports) { module.exports = customPrecompiledTemplates; }\n';
  output += '  if (typeof root !== "undefined") { root.koreCustomPrecompiledTemplates = customPrecompiledTemplates; }\n';
  output += '})(typeof window !== "undefined" ? window : this);\n';

  fs.writeFileSync(outFile, output, 'utf-8');

  const sizeKB = (output.length / 1024).toFixed(1);
  console.log(`\n  -> ${path.relative(process.cwd(), outFile)} (${entries.length} templates, ${sizeKB}KB)`);
  console.log('Done.');
}

main();

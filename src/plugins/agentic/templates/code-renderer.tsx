import { h } from 'preact';

function transformImports(code: string): string {
    const importReactRegex = /import\s+(?:(\w+)\s*,?\s*)?(?:{([^}]+)})?\s+from\s+['"]react['"];?/g;
    const importCssRegex = /import\s+['"]([^'"]+\.css)['"];?/g;
    const importReactDOMRegex = /import\s+\w+\s+from\s+['"]react-dom['"];?/g;
    const reactDomRenderRegex = /ReactDOM\.render\([^)]*\);?/g;

    let transformedCode = code;
    let match;
    let defaultImport = '';
    const namedImports = new Set<string>();

    while ((match = importReactRegex.exec(code)) !== null) {
        if (match[1]) {
            defaultImport = match[1].trim();
        }
        if (match[2]) {
            match[2].split(',').forEach((imp) => namedImports.add(imp.trim()));
        }
    }

    transformedCode = transformedCode.replace(importReactRegex, '');
    transformedCode = transformedCode.replace(importCssRegex, '');
    transformedCode = transformedCode.replace(importReactDOMRegex, '');
    transformedCode = transformedCode.replace(reactDomRenderRegex, '');

    let newImports = '';
    if (defaultImport) {
        newImports += `const ${defaultImport} = window.React;\n`;
    } else {
        newImports += 'const React = window.React;\n';
    }
    if (namedImports.size > 0) {
        newImports += `const { ${Array.from(namedImports).join(', ')} } = React;\n`;
    }

    const result = newImports + transformedCode;
    return result.replace(/export default \w+;\s*$/, '');
}

export function getRunnableCode(code: string): string | null {
    if (!code) return null;
    const componentNameMatch = code.match(/export default (\w+);/);
    const componentName = componentNameMatch ? componentNameMatch[1] : null;

    if (!componentName) {
        console.error("Could not find a default export in the provided JSX code.");
        return null;
    }

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.24.6/babel.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
        </head>
        <body>
          <div id="app"></div>
          <script type="text/babel">
            ${transformImports(code)}
            ReactDOM.render(<${componentName} />, document.getElementById('app'))
          </script>
        </body>
      </html>
    `;
} 
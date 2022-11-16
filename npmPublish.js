var fs = require('fs');
const execSync = require('child_process').execSync;

let packageJSON = fs.readFileSync('package.json',  {encoding:'utf8', flag:'r'} );
execSync('cd dist && npm init --scope=uday_test -y');

let parsedPackageJSON = JSON.parse(packageJSON);
var publishJSON = `
{
    "name": "@uday_test/kore-web-sdk",
    "version": "${parsedPackageJSON.version}",
    "description": "${parsedPackageJSON.description}",
    "main": "kore-web-sdk.esm.browser.js",
    "scripts": {
        "test": ""
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}`;

fs.writeFileSync('dist/package.json', publishJSON);

var fs = require('fs');
const fse = require('fs-extra');
const execSync = require('child_process').execSync;

function getArgs () {
    const args = {};
    process.argv
        .slice(2, process.argv.length)
        .forEach( arg => {
        // long arg
        if (arg.slice(0,2) === '--') {
            const longArg = arg.split('=');
            const longArgFlag = longArg[0].slice(2,longArg[0].length);
            const longArgValue = longArg.length > 1 ? longArg[1] : true;
            args[longArgFlag] = longArgValue;
        }
        // flags
        else if (arg[0] === '-') {
            const flags = arg.slice(1,arg.length).split('');
            flags.forEach(flag => {
            args[flag] = true;
            });
        }
    });
    return args;
}
const args = getArgs();
let tempDist = "./temp/dist";
fse.copySync("./dist", tempDist,{overwrite:true});


let packageJSON = fs.readFileSync('package.json',  {encoding:'utf8', flag:'r'} );


execSync('cd temp && npm init --scope=uday_test -y');

let parsedPackageJSON = JSON.parse(packageJSON);
let npmPublishVersion;
if(args.triggerEvent == 'push'){
    let pckVersion = parsedPackageJSON.version.split('.');

    npmPublishVersion = pckVersion[0] + '.' + pckVersion[1] +'.'+ args.commitId;

}else{
    npmPublishVersion = parsedPackageJSON.version;
}
console.log(npmPublishVersion);
var publishJSON = `
{
    "name": "@uday_test/kore-web-sdk",
    "version": "${npmPublishVersion}",
    "description": "${parsedPackageJSON.description}",
    "main": "dist/kore-web-sdk.esm.browser.js",
    "scripts": {
        "test": ""
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}`;

fs.writeFileSync('temp/package.json', publishJSON);
execSync("cd temp && npm publish --access public")


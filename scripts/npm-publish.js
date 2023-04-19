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
function writePackageJSON(packageJSON){
    fs.writeFileSync(TEMP_DIR+'/package.json', JSON.stringify(packageJSON));
}
function copyDistrubution(){
    fse.copySync("./dist", TEMP_DIR+'/dist',{overwrite:true});
}
function deleteUnWantedKeys(json){
    const unwantedKeys=['dependencies','devDependencies','scripts'];
    unwantedKeys.forEach((key)=>{
        delete json[key];
    });
    return json;
}
function readPackageJSON(){
    let packageJSONString = fs.readFileSync('package.json',  {encoding:'utf8', flag:'r'} );
    packageJSON = JSON.parse(packageJSONString);
    return packageJSON;
}
function updateDatePackageJSONWithArgs(args,packageJSON){
    if(args.version){
        packageJSON.version=args.version;
    }
    if(args.name){
        packageJSON.name=args.name;
    }
    if(args.tag==='dev'){
        if(args.commitId){
            packageJSON.version= packageJSON.version+'-rc.'+args.commitId.substring(0,7);
        }else{
            console.error("Please provide commitId, Example: npm run-script npm-publish-dev -- --commitId=5e2b86a17e2c5c9ce479ffd3c24fbc3a82beff68");
            return;
        }

    }
    return packageJSON;
}
function publish(packageJSON){
    writePackageJSON(packageJSON);   
    execSync('cd '+TEMP_DIR+' && npm publish --access public');
}
const args = getArgs();
const TEMP_DIR = "./.temp";
let packageJSON={};

copyDistrubution();
 packageJSON=readPackageJSON();
 packageJSON=deleteUnWantedKeys(packageJSON);
 packageJSON=updateDatePackageJSONWithArgs(args,packageJSON);//ex:version number and name 
 console.log(packageJSON);
 if(packageJSON){
    publish(packageJSON);
 }






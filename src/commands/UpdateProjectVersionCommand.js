const chalk = require('chalk');
const path = require('path');
var inquirer = require('inquirer');
const semver = require('semver')
const fs = require("fs");
const ora = require('ora');
const ProjectInfo = require('./ProjectInfo')

function UpdateProjectVersionCommand(){
}

/**
 * Examples:
 * ngutils updateVersion --v '1.0.1' -a -p ./
 * ngutils updateVersion --v 'beta' -f -a -p ./
 * ngutils updateVersion --semver 'patch' -a -p ./
 */
UpdateProjectVersionCommand.prototype.execute = function(args, callback) {

    let projectRoot = (args.p ? args.p : args.project);
    this.projectInfo = new ProjectInfo();
    this.projectInfo.loadInfo(projectRoot, true);

    console.log('');

    let defaultNewVer = semver.inc(this.projectInfo.getPackageJson().version, "patch");
    if (args.semver){
        defaultNewVer = semver.inc(this.projectInfo.getPackageJson().version, args.semver);
    } 
    if (args.v){
        defaultNewVer = args.v;
    }

    if (!args.f & !args.force){
        if (!semver.valid(defaultNewVer)){
            console.log(chalk.red("Invalid version '" +defaultNewVer+"': this is not compliant with the 'Semantic Version' standards."));
            console.log(chalk.red("Use -f or --force option in order to use a not compliant version value."));
            return;
        } 
    }

    let doAll = false;
    if (args.a | args.all){
        doAll = true;
    }

    let params = {
        newVersion: defaultNewVer,
        allSubProjects: doAll
    }

    this.doProcess(params, callback);

}

UpdateProjectVersionCommand.prototype.doProcess = function(params, callback) {
    console.log('');
    console.log("Current params:" , params);
    console.log('');

    this.updateJson(this.projectInfo.getPackageJsonFile(), params.newVersion);

    let subprojects = this.projectInfo.getSubProjects();

    if (params.allSubProjects){
        for (let i=0;i<subprojects.length;i++){
            let jsonFile = path.join(subprojects[i].path, "package.json");
            this.updateJson(jsonFile, params.newVersion);
        }
    }    

    console.log('');
    console.log('New version: ', chalk.bold.green(params.newVersion));

}


UpdateProjectVersionCommand.prototype.updateJson = function(fileName,version) {
    
    if (fs.existsSync(fileName)){
        const spinner = ora('Processing file: ' + fileName).start();
        
        let packageJson = this.loadJson(fileName);
        packageJson.version = version;
        this.writeJson(packageJson, fileName);

        spinner.succeed("Processed file: "+fileName);
    }

}

UpdateProjectVersionCommand.prototype.loadJson = function(fileName) {
    let rawdata = fs.readFileSync(fileName);  
    let packageJson = JSON.parse(rawdata);  
    return packageJson;
}

UpdateProjectVersionCommand.prototype.writeJson = function(jsonObject, fileName) {
    let data = JSON.stringify(jsonObject, null, 4);  
    fs.writeFileSync(fileName, data);
}


// export the class
module.exports = UpdateProjectVersionCommand;

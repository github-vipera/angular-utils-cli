var CommandExecutor = require('./CommandExecutor')
const chalk = require('chalk');
const path = require("path");
const fs = require('fs')

function PackProjectTask(mainProjectRoot, projectName, projectRoot, outputDistFolder){
    this.mainProjectRoot = mainProjectRoot;
    this.projectName = projectName;
    this.projectRoot = projectRoot;
    this.outputDistFolder = outputDistFolder;

    let projDistFolder = projectRoot;
    if(mainProjectRoot){
        let ngPackageJson = this.loadJson(path.join(this.projectRoot, "ng-package.json"));
        projDistFolder = path.join(this.projectRoot, ngPackageJson.dest);
    }
    
    //relative
    let relativeProjDistFolder = path.relative(outputDistFolder, projDistFolder);

    let cmd = "npm pack " + relativeProjDistFolder;

    this.runner = (new CommandExecutor).create(cmd, outputDistFolder, " * Packing " + this.projectName);

}

PackProjectTask.prototype.getRunner = function() {
    //console.log("Starting build for " + chalk.green(this.projectName));
    return this.runner;
}

PackProjectTask.prototype.loadJson = function(fileName) {
    let rawdata = fs.readFileSync(fileName);  
    let packageJson = JSON.parse(rawdata);  
    return packageJson;
}

module.exports = PackProjectTask;


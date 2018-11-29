const chalk = require('chalk');
const path = require('path');
var inquirer = require('inquirer');
const semver = require('semver')
const fs = require("fs");
const ora = require('ora');

function ProjectInfo(){
}

ProjectInfo.prototype.loadInfo = function(projectRoot, verbose) {

    this.projectRoot = projectRoot;

    if (verbose){
        console.log(chalk.bold("Parsing Angular project..."));
    }

    this.packageJsonFile = path.join(this.projectRoot, "package.json");
    this.angularProjectFile = path.join(this.projectRoot, "angular.json");

    if (verbose){
        console.log("Laoding file " + this.packageJsonFile);
    }

    this.packageJson = this.loadJson(this.packageJsonFile);
    this.angularProject = this.loadJson(this.angularProjectFile);

    if (verbose){
        console.log('');
        console.log(chalk.bold("Root Project"));
        console.log("  Name: " + chalk.green(this.packageJson.name));
        console.log("  Version: " + chalk.green(this.packageJson.version));
        console.log('');
        console.log(chalk.bold("Angular sub-projects"));
    }

    this.subProjects = [];

    let subProjects = this.angularProject.projects; 
    for (var key in subProjects) {
        if (subProjects.hasOwnProperty(key)) {
            if (verbose){
                console.log("  " + chalk.green(key));
            }
            let angularProject = this.angularProject.projects[key];
            if (angularProject){
                let prjPath = path.join(this.projectRoot, angularProject.root);
                if (this.isAngularSubProject(prjPath)){
                    this.subProjects.push({ name: key, path: prjPath });
                }
            }
        }
    }
    if (verbose){
        console.log('');
    }

}


ProjectInfo.prototype.isAngularSubProject = function(prjPath) {
    let packageJsonFile = path.join(prjPath, "package.json");
    let ngPackageJsonFile = path.join(prjPath, "ng-package.json");
    return (fs.existsSync(packageJsonFile) && fs.existsSync(ngPackageJsonFile));
}

ProjectInfo.prototype.getProjectRoot = function() {
    return this.projectRoot;
}

ProjectInfo.prototype.getPackageJsonFile = function() {
    return this.packageJsonFile;
}

ProjectInfo.prototype.getPackageJson = function() {
    return this.packageJson;
}

ProjectInfo.prototype.getAngularProject = function() {
    return this.angularProjectFile;
}

ProjectInfo.prototype.getSubProjects = function() {
    return this.subProjects;
}


ProjectInfo.prototype.loadJson = function(fileName) {
    let rawdata = fs.readFileSync(fileName);  
    let packageJson = JSON.parse(rawdata);  
    return packageJson;
}

ProjectInfo.prototype.writeJson = function(jsonObject, fileName) {
    let data = JSON.stringify(jsonObject, null, 4);  
    fs.writeFileSync(fileName, data);
}

// export the class
module.exports = ProjectInfo;

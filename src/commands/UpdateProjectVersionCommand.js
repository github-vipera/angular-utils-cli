const chalk = require('chalk');
const path = require('path');
var inquirer = require('inquirer');
const semver = require('semver')
const fs = require("fs");
const ora = require('ora');

function UpdateProjectVersionCommand(){
}

UpdateProjectVersionCommand.prototype.execute = function(args, program, callback) {

    this.projectRoot = program.syncver;

    console.log(chalk.bold("Parsing Angular project..."));

    this.packageJsonFile = path.join(this.projectRoot, "package.json");
    this.angularProjectFile = path.join(this.projectRoot, "angular.json");

    console.log("Laoding file " + this.packageJsonFile);

    this.packageJson = this.loadJson(this.packageJsonFile);
    this.angularProject = this.loadJson(this.angularProjectFile);

    console.log('');
    console.log(chalk.bold("Root Project"));
    console.log("  Name: " + chalk.green(this.packageJson.name));
    console.log("  Version: " + chalk.green(this.packageJson.version));
    console.log('');
    console.log(chalk.bold("Angular sub-projects"));

    this.subProjects = [];

    let subProjects = this.angularProject.projects; 
    for (var key in subProjects) {
        if (subProjects.hasOwnProperty(key)) {
            console.log("  " + chalk.green(key));

            let angularProject = this.angularProject.projects[key];
            if (angularProject){
                let prjPath = path.join(this.projectRoot, angularProject.root);
                this.subProjects.push({ name: key, path: prjPath });
            }
        }
    }
    console.log('');

    let defaultNewVer = semver.inc(this.packageJson.version, "patch");

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newVersion',
                message: 'Current version is ' + chalk.bold.green(this.packageJson.version) + '. Which new version do you want ?',
                validate: function(value) {
                    var valid = (semver.valid(value)!=undefined); 
                    return valid || 'Please enter a valid version';
                },
                default: defaultNewVer,
                filter: String
            },
            {
                type: 'confirm',
                name: 'allSubProjects',
                message: 'do you want to synchronize all the subprojects ?'
            },
        ])
        .then(answers => {
            this.doProcess(answers, callback);
        });

 
}

UpdateProjectVersionCommand.prototype.doProcess = function(params, callback) {
    console.log('');
    console.log("Current params:" , params);
    console.log('');

    this.updateJson(this.packageJsonFile, params.newVersion);

    if (params.allSubProjects){
        for (let i=0;i<this.subProjects.length;i++){
            let jsonFile = path.join(this.subProjects[i].path, "package.json");
            this.updateJson(jsonFile, params.newVersion);
        }
    }    
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

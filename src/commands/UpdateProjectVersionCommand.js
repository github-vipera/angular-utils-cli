const chalk = require('chalk');
const path = require('path');
var inquirer = require('inquirer');
const semver = require('semver')

function UpdateProjectVersionCommand(){
}

UpdateProjectVersionCommand.prototype.execute = function(args, program, callback) {

    this.projectRoot = program.update;

    console.log(chalk.bold("Parsing Angular project..."));


    this.packageJsonFile = path.join(this.projectRoot, "package.json");
    this.angularProjectFile = path.join(this.projectRoot, "angular.json");

    this.packageJson = require(this.packageJsonFile);
    this.angularProject = require(this.angularProjectFile);

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
            this.subProjects.push({ name: key });
        }
    }
    console.log('');

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'newver',
                message: 'Current version is ' + chalk.bold.green(this.packageJson.version) + ' .What is the new version?',
                validate: function(value) {
                    var valid = (semver.valid(value)!=undefined); 
                    return valid || 'Please enter a valid version';
                },
                filter: String
            }
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
        });

    //console.log(this.subProjects);

 
}



// export the class
module.exports = UpdateProjectVersionCommand;

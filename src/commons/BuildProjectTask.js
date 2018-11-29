var CommandExecutor = require('./CommandExecutor')
const chalk = require('chalk');


function BuildProjectTask(projectName, projectRoot, prod){
    this.projectName = projectName;
    this.projectRoot = projectRoot;
    this.prod = prod;

    let cmd = "ng build " + projectName;
    if (this.prod){
        cmd = cmd + " --prod";
    } 
    this.runner = (new CommandExecutor).create(cmd, this.projectRoot, " * Building " + this.projectName);

}

BuildProjectTask.prototype.getRunner = function() {
    //console.log("Starting build for " + chalk.green(this.projectName));
    return this.runner;
}

module.exports = BuildProjectTask;


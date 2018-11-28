const chalk = require('chalk');
const path = require('path');
var inquirer = require('inquirer');
const fs = require("fs");
const ora = require('ora');
var ProjectInfo = require('./ProjectInfo')

function BuildProjectsCommand(){
}

/**
 * Examples:
 * ngutils build --prod 
 */
BuildProjectsCommand.prototype.execute = function(args, program, rootFolder, release, callback) {

    console.log(chalk.bold("Building projects..."));

    this.projectInfo = new ProjectInfo();
    this.projectInfo.loadInfo(rootFolder);

    //TODO!!
}

// export the class
module.exports = BuildProjectsCommand;

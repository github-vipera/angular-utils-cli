const chalk = require('chalk');
const path = require('path');
var inquirer = require('inquirer');
const semver = require('semver')
const fs = require("fs");
const ora = require('ora');
const ProjectInfo = require('./ProjectInfo')

function GetVersionCommand(){
}

/**
 * Examples:
 * ngutils getVersion  --project ./                                     -> display current project version
 * ngutils getVersion --semver patch --project ./                       -> display the next project version based on current and incremented in patch semver part
 */
GetVersionCommand.prototype.execute = function(args, callback) {
    
    let projectRoot = (args.p ? args.p : args.project);
    this.projectInfo = new ProjectInfo();
    this.projectInfo.loadInfo(projectRoot);

    let version = this.projectInfo.getPackageJson().version;

    if (args.semver){
        version = semver.inc(this.projectInfo.getPackageJson().version, args.semver);
    }

    console.log(version);

 
}

// export the class
module.exports = GetVersionCommand;

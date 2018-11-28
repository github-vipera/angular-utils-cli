const figlet = require('figlet');
const chalk = require('chalk');
const path = require('path');
var inquirer = require('inquirer');
const fs = require("fs");
const ora = require('ora');
var ProjectInfo = require('./ProjectInfo')

const CLI_NAME = require('../../package').description;
const CLI_VERSION = require('../../package').version;

function InfoCommand(){
}

InfoCommand.prototype.execute = function(args, callback) {

    figlet(CLI_NAME, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        console.log('');
        console.log(chalk.blue.bold(CLI_NAME + " - Vipera © 2018"));
        console.log(chalk.blue.bold("Version " + CLI_VERSION));
        console.log('');
    });


}


// export the class
module.exports = InfoCommand;

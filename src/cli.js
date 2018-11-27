const figlet = require('figlet');
const program = require('commander');
const chalk = require('chalk');
const path = require('path');

const CLI_NAME = "Angular Utils CLI"
const CLI_VERSION = require('../package').version;

module.exports = function (inputArgs, cb) {

    figlet(CLI_NAME, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        cli(inputArgs, cb);
    });
}

function cli (inputArgs, cb) {

    console.log('');
    console.log(chalk.blue.bold("Angular Utils CLI - Vipera © 2018"));
    console.log(chalk.blue("Version " , CLI_VERSION));
    console.log('');

}

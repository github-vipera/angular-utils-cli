const figlet = require('figlet');
var program = require('commander');
const chalk = require('chalk');

const CLI_NAME = "Angular Utils CLI"
const CLI_VERSION = require('../package').version;

//Commands
var UpdateProjectVersionCommand = require('./commands/UpdateProjectVersionCommand');

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
    //console.log(chalk.blue("Version " , CLI_VERSION));
    console.log('');

    program
        .version(CLI_VERSION)
        .option('-v, --version', 'Current CLI Version')
        .option('-u, --update [angularProject]', 'Update projects version of a specific [angularProject]')
        .parse(inputArgs);

        if (program.update) {
            new UpdateProjectVersionCommand().execute(inputArgs, program ,cb);
        }
 }

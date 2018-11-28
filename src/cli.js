const figlet = require('figlet');
var program = require('commander');
const chalk = require('chalk');

const CLI_NAME = "Angular Utils CLI"
const CLI_VERSION = require('../package').version;

//Commands
var UpdateProjectVersionCommand = require('./commands/UpdateProjectVersionCommand');
var BuildProjectsCommand = require('./commands/BuildProjectsCommand');
var GetVersionCommand = require("./commands/GetVersionCommand");
var InfoCommand = require('./commands/InfoCommand');

module.exports = function (inputArgs, cb) {

    cli(inputArgs, cb);
    /*
    figlet(CLI_NAME, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
        cli(inputArgs, cb);
    });
    */
}

function cli (inputArgs, cb) {

    /*
    console.log('');
    console.log(chalk.blue.bold("Angular Utils CLI - Vipera © 2018"));
    console.log('');
    */

    const argv = require('yargs')
        .command('info', 'Display informations about this tool')    
        .command('getVersion', 'Get current Angular project version')
            .option('project', {
                alias: 'p'
            })
        .command('updateVersion', 'Update current Angular project version')
            .option('project', {
                alias: 'p'
            })
        .argv
    
    //console.log(argv);

    let command = argv._[0];    

    if (!command){
        console.log('');
        console.log(chalk.red.bold("No command specified. Type 'ngutils help' to see all options."));
        console.log('');
        new InfoCommand().execute(argv, cb);
        return;
    }

    if (command === 'info'){
        return new InfoCommand().execute(argv, cb);
    }
    else if (command === 'getVersion'){
        return new GetVersionCommand().execute(argv, cb);
    }
    else if (command === 'updateVersion'){
        return new UpdateProjectVersionCommand().execute(argv, cb);
    }
    else if (command === 'build'){
        //TODO!!
        return;
    }
    else {
        console.log(chalk.red.bold("Unknown command '"+ command +"'. Type 'ngutils help' to see all options."));
        console.log('');
        return;
    }

    //Examples:
    // Build main project in release mode from ./
    // ngutils build --release -p ./
    //
    // Build all projects in release mode from ./
    // ngutils build --release -a -p ./
    //
    // Update all projects deps from ./
    // ngutils updateVersion --semver minor -a -p ./
    // ngutils updateVersion --semver major -a -p ./
    // ngutils updateVersion --semver patch -a -p ./
    // ngutils updateVersion --ver 1.2.3 -a -p ./
    // ngutils getVersion -p ./
    // ngutils getVersion --semver minor -p ./

    /*
    program
        .version(CLI_VERSION)
        .command('ngutils [angularProjectFolder]')
        .option('-s, --syncver', 'Update projects version to a specific [angularProject]')
        .option('-b, --build [angularProjectFolder]', 'Build all projects inside an [angularProject]')
        .option('-r, --release [angularProjectFolder]', 'Build in release mode all projects inside an [angularProject]')
        .option('-a, --all', 'Perform the command over all subprojects')
        .action((dir,cmd)=>{
            console.log('dir=' + dir +' cmd='+ cmd +'')
        })
        .parse(inputArgs);

    if (program.syncver) {
        return new UpdateProjectVersionCommand().execute(inputArgs, program ,cb);
    }
    if (program.build) {
        return new BuildProjectsCommand().execute(inputArgs, program, program.build, false, cb);
    }
    if (program.release) {
        return new BuildProjectsCommand().execute(inputArgs, program, program.release, true, cb);
    }
    */

}


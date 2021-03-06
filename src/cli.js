const figlet = require('figlet');
var program = require('commander');
const chalk = require('chalk');
var CommandExecutor = require('./commons/CommandExecutor');
const path = require('path')
const fs = require('fs'
)
const CLI_NAME = "Angular Utils CLI"
const CLI_VERSION = require('../package').version;

//Commands
var UpdateProjectVersionCommand = require('./commands/UpdateProjectVersionCommand');
var BuildProjectsCommand = require('./commands/BuildProjectsCommand');
var GetVersionCommand = require("./commands/GetVersionCommand");
var InfoCommand = require('./commands/InfoCommand');
var BuildProjectsCommand = require('./commands/BuildProjectsCommand');
var PackProjectsCommand = require('./commands/PackProjectsCommand')

module.exports = function (inputArgs, cb) {
   
    /*
   console.log("Started!!")

   let runner = new CommandExecutor().create("pwd", "../");
   
   runner().then(()=>{
    console.log("Done!")
   }, (error)=>{
    console.log("Error:", error)
   });
   */
    
    cli(inputArgs, cb);
}

async function test(){
    const run = async () => {
        let out;
        
        try {
          out = await execShPromise('ng build', true);
        } catch (e) {
          console.log('Error: ', e);
          console.log('Stderr: ', e.stderr);
          console.log('Stdout: ', e.stdout);
          
          return e;
        }
        
        console.log('out: ', out.stdout, out.stderr);
      }
      return run();
}

function cli (inputArgs, cb) {


    const argv = require('yargs')
        .command('info', 'Display informations about this tool')    
        .command('getVersion', 'Get current Angular project version')
        .command('updateVersion', 'Update current Angular project version')
        .command('build', 'Build current Angular project')
        .command('pack', 'Make distributable packages')
        .option('project', {
            alias: 'p',
            describe: 'The root project folder' ,
            default: './'
        })
        .option('all', {
            alias: 'a',
            describe: 'Apply the command to all subprojects' 
        })
        .option('force', {
            alias: 'f',
            describe: 'Force the execution of the command although the validation of some parameters fails' 
        })
        .option('prod', {
            describe: 'Build with Angular "prod" switch' 
        })
        .option('output', {
            alias: 'o',
            describe: 'The output folder' ,
            default: './output'
        })
        .option('dist', {
            describe: 'The package distribution destination folder' ,
            default: './package_dist'
        })
        .demandOption(['project'], 'Please provide the project path argument to work with this tool')
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
        if (checkIsAngular(argv)){
            return new GetVersionCommand().execute(argv, cb);
        }
    }
    else if (command === 'updateVersion'){
        if (checkIsAngular(argv)){
            return new UpdateProjectVersionCommand().execute(argv, cb);
        }
    }
    else if (command === 'build'){
        if (checkIsAngular(argv)){
            return new BuildProjectsCommand().execute(argv, cb);
        }
    }
    else if (command === 'pack'){
        if (checkIsAngular(argv)){
            return new PackProjectsCommand().execute(argv, cb);
        }
    }
    else {
        console.log(chalk.red.bold("Unknown command '"+ command +"'. Type 'ngutils help' to see all options."));
        console.log('');
        return;
    }

    //Examples:
    // Build main project in prod mode from ./
    // ngutils build --prod -p ./
    //
    // Build all projects in prod mode from ./
    // ngutils build --prod -a -p ./
    //
    // Build all projects from ./
    // ngutils build -a -p ./
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

function checkIsAngular(args){
    let projectRoot = (args.p ? args.p : args.project);
    if (!isAngularProject(projectRoot)){
        console.warn(chalk.bold("This does not seem to be a valid Angular project."));
        return false;
    }
    return true;
}

function isAngularProject(prjPath) {
    let packageJsonFile = path.join(prjPath, "package.json");
    let ngPackageJsonFile = path.join(prjPath, "angular.json");
    return (fs.existsSync(packageJsonFile) && fs.existsSync(ngPackageJsonFile));
}


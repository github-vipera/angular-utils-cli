const chalk = require('chalk');
var ProjectInfo = require('./ProjectInfo')
var BuildProjectTask = require('../commons/BuildProjectTask')
const serialExec = require('promise-serial-exec')

function BuildProjectsCommand(){
}

/**
 * Examples:
 * ngutils build --prod 
 */
BuildProjectsCommand.prototype.execute = function(args, callback) {

    let projectRoot = (args.p ? args.p : args.project);

    this.projectInfo = new ProjectInfo();
    this.projectInfo.loadInfo(projectRoot);

    let isProd = (args.prod ? true : false);

    if (args.all){
        let tasks = [];
        let subProjects = this.projectInfo.getSubProjects();
        for (let i=0;i<subProjects.length;i++){
            let buildTask = new BuildProjectTask( subProjects[i].name, subProjects[i].path);
            tasks.push(buildTask.getRunner());
        }

        //add the root project
        let buildTask = new BuildProjectTask( "Root Project", this.projectInfo.getProjectRoot());
        tasks.push(buildTask.getRunner());

        console.log(chalk.bold.gray("Building all project..."));

        serialExec(tasks).then(console.log);

    } else {

        console.log(chalk.bold.gray("Building main project..."));

        let buildTask = new BuildProjectTask("Root Project", this.projectInfo.getProjectRoot());
        buildTask.getRunner()().then(()=>{
            console.log(chalk.green("Main project built successfully."));
        }, (error)=>{
            console.log(chalk.red("Main project build error:" + error));
        });

    }

}

BuildProjectsCommand.prototype.buildProject = function(path, prod){

    let cmd = "ng build";
    if (prod){
        cmd = cmd + " --prod";
    } 
    let runner = (new CommandExecutor).create(cmd);

    return runner;
}

// export the class
module.exports = BuildProjectsCommand;




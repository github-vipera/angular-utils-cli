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
            let buildTask = new BuildProjectTask( subProjects[i].name, subProjects[i].path, isProd);
            tasks.push(buildTask.getRunner());
        }

        //add the root project
        let buildTask = new BuildProjectTask( "Root Project", this.projectInfo.getProjectRoot(), isProd);
        tasks.push(buildTask.getRunner());

        console.log(chalk.bold.gray("Building all projects..."));

        serialExec(tasks).then(
        );

    } else {

        console.log(chalk.bold.gray("Building main project..."));

        let buildTask = new BuildProjectTask("Root Project", this.projectInfo.getProjectRoot(), isProd);
        buildTask.getRunner()().then(()=>{
            console.log(chalk.green("Main project built successfully."));
        }, (error)=>{
            console.log(chalk.red("Main project build error:" + error));
        });

    }

}

// export the class
module.exports = BuildProjectsCommand;




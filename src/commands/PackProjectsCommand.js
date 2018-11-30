const chalk = require('chalk');
var ProjectInfo = require('./ProjectInfo')
var PackProjectTask = require('../commons/PackProjectTask')
const serialExec = require('promise-serial-exec')
const fs = require('fs')

function PackProjectsCommand(){
}

/**
 * Examples:
 * ngutils build --prod 
 */
PackProjectsCommand.prototype.execute = function(args, callback) {

    let projectRoot = (args.p ? args.p : args.project);
    let outputDistFolder = args.dist;
    
    this.ensureFolder(outputDistFolder);

    this.projectInfo = new ProjectInfo();
    this.projectInfo.loadInfo(projectRoot);

    if (args.all){
        let tasks = [];
        let subProjects = this.projectInfo.getSubProjects();
        for (let i=0;i<subProjects.length;i++){
            let packTask = new PackProjectTask( projectRoot, subProjects[i].name, subProjects[i].path, outputDistFolder);
            tasks.push(packTask.getRunner());
        }

        //add the root project
        let packTask = new PackProjectTask( null, "Root Project", this.projectInfo.getProjectRoot(), outputDistFolder);
        tasks.push(packTask.getRunner());

        console.log(chalk.bold.gray("Packing all project..."));

        serialExec(tasks).then(
        );

    } else {

        console.log(chalk.bold.gray("Packing main project..."));

        let packTask = new PackProjectTask(null, "Root Project", this.projectInfo.getProjectRoot(), outputDistFolder);
        packTask.getRunner()().then(()=>{
            console.log(chalk.green("Main project packed successfully."));
        }, (error)=>{
            console.log(chalk.red("Main project pack error:" + error));
        });

    }

}

PackProjectsCommand.prototype.ensureFolder = function(path){
    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
}


// export the class
module.exports = PackProjectsCommand;




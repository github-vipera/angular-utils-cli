const execShPromise = require("exec-sh").promise;
const chalk = require('chalk');

function CommandExecutor(){
}

/**
 * Examples:
 * ngutils build --prod 
 */
CommandExecutor.prototype.create = function(cmd, cwd, logTag) {

    this.cmd = cmd;
    this.cwd = cwd;
    this.logTag = logTag;

    this.run = async () => {
        let out;

        if (this.logTag){
          console.log(chalk.green(this.logTag) + chalk.gray('.....Executing: ', this.cmd));
        } else {
          console.log(chalk.gray('Executing: ', this.cmd));
        }
        
        try {
          out = await execShPromise(cmd, { cwd: this.cwd });
        } catch (e) {
          console.log('Error: ', e);
          //console.log('Stderr: ', e.stderr);
          //console.log('Stdout: ', e.stdout);
          return e;
        }
        //console.log('out: ', out.stdout, out.stderr);
      }
    return this.run;

}

// export the class
module.exports = CommandExecutor;

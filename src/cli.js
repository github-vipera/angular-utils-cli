var figlet = require('figlet');

const CLI_NAME = "Angular Utils CLI"

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
    //TODO!!
    console.log("Hello Angular Utils!");
}

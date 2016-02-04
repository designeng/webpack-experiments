var chalk = require("chalk");
var exec  = require("child_process").exec;

// wait for running server
setTimeout(runTest, 2000);

function runTest() {
    exec('curl http://localhost:3000/article', function(error, stdout, stderr) {
        console.log('stdout: ' + chalk.blue(stdout));
        console.log('stderr: ' + chalk.red (stderr));
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        exec('lsof -t -i tcp:3000 | xargs kill', function(error, stdout, stderr) {
            console.log(chalk.yellow('server stopped!'));
        });
    });
}
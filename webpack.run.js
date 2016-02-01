import webpack      from "webpack";
import { exec }     from "child_process";
import config       from "./webpack.config";

const compiler = webpack(config);

compiler.run((err, stats) => {
    if (err) {
        console.log(`COMPILATION ERROR: ${err}`);
    } else {
        exec('npm test', (error, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    }
});
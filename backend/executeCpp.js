const { rejects } = require("assert");
const {exec} = require("child_process");
const { resolve, join } = require("path");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname,"./outputs"); //set a new path for output files

//If the output folder doesn't exist ,it'll create it automatically
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}

const executeCpp = (filePath)=>{
    const jobId = path.basename(filePath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.exe`);
    
    return new Promise((resolve,reject)=>{
        //Execute the terminal command
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe `, 
        (error,stdout,stderr) => {
            error && reject ({error,stderr});
            stderr && reject(stderr);
            resolve(stdout);//Resolves if everything goes fine
        })
    })
}

module.exports = {
    executeCpp,
}
const { rejects } = require("assert");
const {exec} = require("child_process");
const { resolve, join } = require("path");


const executeJS = (filePath)=>{
    
    return new Promise((resolve,reject)=>{
        //Execute the terminal command
        exec(`node ${filePath} `, 
        (error,stdout,stderr) => {
            error && reject ({error,stderr});
            stderr && reject(stderr);
            resolve(stdout);//Resolves if everything goes fine
        })
    })
}

module.exports = {
    executeJS,
}
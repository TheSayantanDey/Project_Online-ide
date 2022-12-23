const {exec} = require("child_process");


const executePy = (filePath)=>{
    
    return new Promise((resolve,reject)=>{
        //Execute the terminal command
        exec(`python ${filePath}`, 
        (error,stdout,stderr) => {
            error && reject ({error,stderr});
            stderr && reject(stderr);
            resolve(stdout);//Resolves if everything goes fine
        })
    })
}

module.exports = {
    executePy,
}
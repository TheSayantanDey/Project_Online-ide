//Made a file to write a function to generate the code file from the post request 
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

//If the code folder didn't exist , it'll generate automatically
if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
    const jobId = uuid(); //I have created an unique string 
    const filename = `${jobId}.${format}`; //made a filename using the unique filename and format
    const filepath = path.join(dirCodes, filename); //created a filepath for the file
    await fs.writeFileSync(filepath, content); //Write the code to that file

    return filepath;
};

module.exports = {
    generateFile,
};
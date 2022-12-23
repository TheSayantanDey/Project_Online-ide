const express = require("express");
const cors = require("cors");

const { generateFile } = require('./generateFile');
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const { executeJS } = require("./executeJS");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/", (req,res)=>{
    return res.json({hello : "world"});
})

app.post("/run", async (req,res)=>{

    const {language = "cpp" , code} = req.body;

    // console.log(language , code.length);

    if(code === undefined){
        return res.status(400).json({success:false,error:"Empty code body !"})
    }
    try {
    //Need to genetate a c++ file with the content from the request 
    const filePath = await generateFile(language,code)

    //Need to run the file and send the respose back
    let output;
    if(language === "cpp"){
        output = await executeCpp(filePath);
    }else if(language === "py"){ 
        output = await executePy(filePath);
    }else if(language === 'js'){
        output = await executeJS(filePath);
    }
    
    // console.log(output);
    return res.json({filePath , output });

    }catch(err){
        // console.log(err);
        res.status(500).json({err})
    }
})

app.listen(5000 , ()=> {
    console.log(`Listening on port 5000`);
})
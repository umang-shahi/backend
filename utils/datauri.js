const datauri = require("datauri/parser");


const path = require("path");

//function

const getDataUri = (file)=>{
    const parser = new datauri();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer)
}


module.exports = getDataUri;


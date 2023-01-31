
const http = require("http");
const fs = require("fs")
const hostname = "localhost";
const PORT = 5000;

const home =fs.readFileSync("./home.html");

const server = http.createServer((req,res)=>{
    console.log(req.url);

    if(req.url === "/"){
     return res.end(home)
    }

    else if(req.url === "/about"){
        return res.end("<h1>About page</h1>")
    }
    else 
    {
        return res.end("<h1>404 not found</h1>")
    }
})

server.listen(PORT,hostname,()=>{
    console.log(`server is running at port: http://${hostname}:${PORT}`);

})
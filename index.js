//core module
const http = require("http");
//thord party module
const pokemon = require("pokemon");
const data= require("./data")
// const fs = require("fs");
// const path = require("path");
// const dirPath = path.join(__dirname, "files");
// const filePath = `${dirPath}/file.text`;
// fs.writeFileSync(filePath, "Kina oralo lagyo share bazar!");
// fs.readFile(filePath, "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
const PORT = 4000;
const hostname = "localhost";
// const home = fs.readFileSync("./home.html");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(
    JSON.stringify(data))

  res.end();
  // if (req.url === "/") {
  //   return res.end(home);
  // } else {
  //   return res.end("<h1>page not found,404</h1>");
  // }
});
server.listen(PORT, hostname, () => {
  console.log(`server is running at port: http://${hostname}:${PORT}`);
});
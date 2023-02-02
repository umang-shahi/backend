const express = require("express");
const path = require("path");
// const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//http method
app.get("/", (req, res) => {
  //   res.sendFile(path.join(__dirname + "/home.html"));
});
app.post("/api/v1/login", (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  res.json({
    success: true,
    name: userName,
    email: userEmail,
    password: userPassword,
  });
});
//port
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port: http://localhost:${PORT}`);
});








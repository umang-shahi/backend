const express = require("express");
const { register, login } = require("../controllers/userController");
// const createUser = require("../controllers/userController");
const singleUpload = require("../middlewares/multer");

const router = express.Router();
//register User Routes
router.route("/register").post(singleUpload,register);

//login route
router.route("/login").post(login);
module.exports = router;
const express = require("express");
 const { register,login,profileUpdate, changePassword, singleUser, getAllUsers, getSingleUserByAdmin } = require("../controllers/userController");
const { auth, isAuthAdmin } = require("../middlewares/auth");
const singleUpload = require("../middlewares/multer");
// const createUser = require("../controllers/userController");
// const singleUpload = require("../middlewares/multer");
const router = express.Router();
//register User Routes
router.route("/register").post(singleUpload, register);
//login routers
router.route("/login").post(login);

//update profile routes
router.route("/profile/update").put(auth,singleUpload,profileUpdate)

//change password
router.route("/change/password").put(auth,changePassword);

//get logged in user

router.route("/me").get(auth,singleUser);

//for admin routes

router.route("/all/users").get(auth,isAuthAdmin,getAllUsers);

//for getting single user by admin
router.route("/single/user/:id").get(auth,isAuthAdmin,getSingleUserByAdmin);

//delete user by admin
// router.route("/delete/user/:id").delete(auth,isAuthAdmin,deleteSingleUser)

module.exports = router;
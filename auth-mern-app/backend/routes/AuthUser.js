const express = require("express");
const router = express.Router();
const { signup, login } = require("../controller/AuthController");
const { signupValidation,loginValidation} = require("../middleware/AuthValidation")
router.post("/signup",signupValidation,signup);
router.post("/login",loginValidation,login);
module.exports = router;
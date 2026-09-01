const express = require("express");
const router = express.Router();
const { signup } = require("../controller/AuthController");
router.post("/signup",signup);
router.post("/login",(req,res)=>{
    res.send("login success");
})
module.exports = router;
const express = require("express");
const router = express.Router();
const { handleCreteUser } = require("../controllers/user");
router.post("/", handleCreteUser);
module.exports = router;

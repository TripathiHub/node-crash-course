const {handleGenerateShortUrl,handleRedirectUrl} = require("../controllers/url");
const express  = require("express");
const router = express.Router();
router
.route("/")
.post(handleGenerateShortUrl)
.get(handleRedirectUrl);
module.exports = router;
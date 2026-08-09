const {handleGenerateShortUrl,handleRedirectUrl,handleUrlAnalysis} = require("../controllers/url");
const express  = require("express");
const router = express.Router();
router
.route("/")
.post(handleGenerateShortUrl)
.get(handleRedirectUrl);
router.get("/analysis",handleUrlAnalysis);
module.exports = router;
const {handleGenerateShortUrl,handleRedirectUrl,handleUrlAnalysis} = require("../controllers/url");
const express  = require("express");
const router = express.Router();
router.post("/url", handleGenerateShortUrl);
router.get("/url/analysis", handleUrlAnalysis);
router.get("/:shortId", handleRedirectUrl);
module.exports = router;
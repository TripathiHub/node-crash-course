const shortid = require("shortid");
const URL = require("../models/url");
async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body || !body.url) {
    return res.status(400).json({ error: "url required" });
  }
  const shortId = shortid();
  await URL.create({
    shortUrl: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}
async function handleRedirectUrl(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOneAndUpdate(
    {
      shortUrl : shortId,
    },
    {
      $push: {
        visitHistory: {
          timesnap: Date.now(),
        },
      },
    },
  );
   if (!result) {
    return res.status(404).json({
      error: "Short URL not found",
      shortId: shortId,
    });
  }
  return res.redirect(result.redirectUrl);
}
async function handleUrlAnalysis(req, res) {
  const allUrls = await URL.find({});
  const results = allUrls.map((url) => ({
    shortId: url.shortUrl,
    redirectUrl: url.redirectUrl,
    clicks: url.visitHistory.length,
  }));
  return res.json(results);
}
module.exports = {
  handleGenerateShortUrl,
  handleRedirectUrl,
  handleUrlAnalysis,
};

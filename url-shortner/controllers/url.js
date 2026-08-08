const shortid = require("shortid");
const URL = require("../models/url");
async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
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
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timesnap: Date.now(),
        },
      },
    },
  );
  return res.redirect(result.redirectUrl);
}
module.exports = {
  handleGenerateShortUrl,
  handleRedirectUrl,
};

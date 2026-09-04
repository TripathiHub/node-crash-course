const jwt = require("jsonwebtoken");
function products(req, res) {
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "tv",
            price: 20000
        },
    ]);
}
module.exports = {
    products
}
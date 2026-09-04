const express = require("express");
const router = express.Router();
const {products} = require("../controller/productController");
const {ensureAuthenticated} = require("../middleware/ensureAuthenticated");
router.get("/products",ensureAuthenticated,products);
module.exports = router;
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user");
const AuthRouter = require("./routes/AuthUserRouter");
const ProductRouter = require("./routes/productRouter");
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGODB_URI).
    then(() => {
        console.log("MongoDB Connected");
    }).catch((error) => console.log("Error in connection", error));
app.use(bodyParser.json());
app.use(cors());
app.use("/",AuthRouter);
app.use("/",ProductRouter);
app.get("/", (req, res) => res.send("Home"));
app.listen(PORT, () => console.log(`server started at ${PORT}`));
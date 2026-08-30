const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 9000;
app.get("/",(req,res)=> res.send("Home"));
app.listen(PORT,()=>console.log(`server started at ${PORT}`));
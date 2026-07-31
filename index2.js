const express = require("express");
const app = express();
app.get("/",(req,res)=>{
   return res.send("hello from home")
})
app.get("/about",(req,res)=>{
   return res.send(`hello ${req.query.name} your age ${req.query.age}`)
})
app.listen(8000,()=>{
    console.log("server started");
})
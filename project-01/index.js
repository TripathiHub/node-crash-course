const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
//PORT
const PORT = 8000;
//middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//connection
mongoose.connect("mongodb://127.0.0.1:27017/node-project-01").then(() => {
  console.log("MongoDB connected") }).catch((error) => console.log(error));
// schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },

  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
  job_title: {
    type: String,
  },
},{timestamps : true});
// model
const User = mongoose.model("user",userSchema);
app.use((req, res, next) => {
  const log = `\n${Date.now()} : ${req.url} : ${req.method} : ${req.ip}`;
  fs.appendFile("./log.txt", log, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("log written");
    }
    next();
  });
});
app.get("/api/users", async (req, res) => {
  const allDBUser =await User.find({});
  res.json(allDBUser);
});
app.get("/users", async(req, res) => {
  const allDBUser =  await User.find({});
  const html = ` <ul>
       ${allDBUser.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
       </ul>
    `;
  res.send(html);
});
app.post("/api/users",async (req, res) => {
  const body = req.body;
  if (!body || !body.email || !body.job_title) {
    return res.status(400).send({ error: "Fill required data" });
  }
  const result = await User.create({
    first_name : body.first_name,
    last_name : body.last_name,
    email : body.email,
    gender : body.gender,
    job_title : body.job_title
  })
  return res.status(201).json(result);
});
app
  .route("/api/users/:id")
  .get(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.json(user);
  })
  .delete(async(req, res) => {
   const deletedUser=await User.findByIdAndDelete(req.params.id);
    res.json({ status: `successfully deleted: ${deletedUser}`});
  })
  .patch(async(req,res)=>{
  const updatedUser=await User.findByIdAndUpdate(req.params.id,{ last_name : "changed"});
    return res.json({updatedUser});
  });
app.listen(PORT, () => {
  console.log("server started :",PORT);
});

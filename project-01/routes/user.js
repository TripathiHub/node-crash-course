const User = require("../models/user");
const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  const allDBUser =await User.find({});
  res.json(allDBUser);
});
router.post("/",async (req, res) => {
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
router
  .route("/:id")
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
  module.exports = router;
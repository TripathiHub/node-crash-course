const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { error } = require("console");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use((req,res,next)=>{
  const log = `\n${Date.now()} : ${req.url} : ${req.method} : ${req.ip}`;
  fs.appendFile("./log.txt",log,(err,data)=>{
    if(err){
      console.log(err);
    }else{
      console.log("log written");
    }
    next();
  })
})
app.get("/api/users", (req, res) => {
  res.json(users);
});
app.get("/users", (req, res) => {
  const html = ` <ul>
       ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
       </ul>
    `;
  res.send(html);
});
app.post("/api/users", (req, res) => {
  const body = req.body;
  if(!body || !body.email || !body.job_title){
    return res.status(402).send({ error : "Fill required data"});
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "succcess", id: users.length });
  });
});
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user){
      res.status(404).send({ error : "User not found"})
    }
    return res.json(user);
  })
  .delete((req, res) => {
    // todo
    res.json({ status: "pending" });
  });
app.listen(8000, () => {
  console.log("server started");
});

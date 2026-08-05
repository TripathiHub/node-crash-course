const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const {connectMongoDB} = require("./connection");
const {logReqRes}= require("./middlewares/index");
//PORT
const PORT = 8000;
// built-in middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// middleware for user logs
app.use(logReqRes("log.txt"));
//connection
connectMongoDB("mongodb://127.0.0.1:27017/node-project-01");
//routes
app.use("/api/users",userRouter);
//listen
app.listen(PORT, () => {
  console.log("server started :",PORT);
});

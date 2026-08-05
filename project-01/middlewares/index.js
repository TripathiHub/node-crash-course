const fs = require("fs");
function logReqRes(fileName){
    return (req,res,next)=>{
         const log = `\n${Date.now()} : ${req.url} : ${req.method} : ${req.ip}`;
       fs.appendFile("./log.txt", log, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("log written");
    }
    next();
       })
    }
}
module.exports = {
    logReqRes,
}
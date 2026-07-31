const http = require("http");
const fs = require("fs");
const myServer = http.createServer((req, res) => {
  const log = `${Date.now() } : ${ req.url } new req rec\n`;
  fs.appendFile("this.txt", log, (error, result) => {
    switch(req.url){
      case "/" : res.end("Home");
      break
      case "/about" : res.end("My name is Himanshu");
      break
      case "/contact" : res.end("Email : abc@gmail.com");
      break
      default :
      res.end("404");
    }
  });
});
myServer.listen(8000, () => {
  console.log("server started");
});

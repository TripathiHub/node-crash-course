const http = require("http");
const fs = require("fs");
const url = require("url");
const myServer = http.createServer((req, res) => {
  const log = `${Date.now() } : ${ req.url } new req rec\n`;
  const myUrl = url.parse(req.url,true);
  console.log(myUrl);
  fs.appendFile("this.txt", log, (error, result) => {
    switch(myUrl.pathname){
      case "/" : res.end("Home");
      break
      case "/about" : 
      const username = myUrl.query.myname;
      res.end(`My name is ${username}`);
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

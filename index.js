const http = require("http");
const fs = require("fs");
const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : new req rec`;
  fs.appendFile("this.txt", log, (error, result) => {
    res.end("hello server");
  });
});
myServer.listen(8000, () => {
  console.log("server started");
});

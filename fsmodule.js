const fs = require("fs");

fs.writeFile("this.txt", "Hello Node!", (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("Success!");
});
fs.readFile("this.txt", "utf8", (error, data) => {
  console.log(error, data);
});
console.log("file opretions done");

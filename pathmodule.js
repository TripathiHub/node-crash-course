const path = require("path");
const a = path.basename(
  "c:/Users/Nihal Ram Tripathi/Documents/node-crash-course/osmodule.js",
);
const a1 = path.basename(__filename);
const a2 = path.basename(__dirname);
const a3 = path.dirname(__filename);
const a4 = path.extname(__filename);
const a5 = path.parse(__filename);

console.log(a);
console.log(a1);
console.log(a2);
console.log(a3);
console.log(a4);
console.log(a5);

const mongoose = require("mongoose");
async function connectMongoDb(url) {
  return await mongoose
    .connect(url)
    .then(() => console.log("MongoDb connected"))
    .catch((error) => console.log(error));
}
module.exports = {
    connectMongoDb
}

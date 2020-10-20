const secretURI = require("../../src/secrets");

const mongoose = require("mongoose");
const URI = secretURI;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db is on"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

module.exports = db;

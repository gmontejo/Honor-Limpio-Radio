const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const db = require("./database");

const apiPort = 3002;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));

//SETTINGS
app.set("port", process.env.PORT || 3002);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/radio", require("./routes/user-routes.js"));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

exports.app = functions.https.onRequest(app);

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const db = require("./database");

const apiPort = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));

//SETTINGS
app.set("port", process.env.PORT || 3001);

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/radio", require("./routes/user-routes.js"));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

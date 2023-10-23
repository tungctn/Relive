require("dotenv").config();
require("./config");
require("./events/notification");

const app = require("express")();
app.use(require("express").json());
app.use(require("cors")());
app.use("/api", require("./routes"));

module.exports = app;

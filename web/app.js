const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const cookieParser = require("cookie-parser");
const registerRoute = require("./routes/registerRoute");
const doctorRoute = require("./routes/doctorRoute");
const adminRoutes = require("./routes/adminRoutes");
const logoutRoute = require("./routes/logoutRoute");
const exerciseRoute = require("./routes/exerciseRoute");
const reportRoute = require("./routes/reportRoute");
const cors = require("cors");
const app = express();

dotenv.config({ path: "./config.env" });

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const dbURI = "mongodb+srv://tung2002:tung2002@cluster0.psjr4nb.mongodb.net/";
const port = 6000;

mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port);
    console.log(`connected to db and listening at port ${port}`);
  })
  .catch((err) => {
    app.listen(port);
    app.get("/", (req, res) => {
      res.send(
        "Something Went Wrong! Please Try again after some time, if problem persists please contact us."
      );
    });
  });

app.use(authRoutes);
app.use(registerRoute);
app.use(doctorRoute);
app.use(patientRoutes);
app.use(exerciseRoute);
app.use(adminRoutes);
app.use(logoutRoute);
app.use(reportRoute);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

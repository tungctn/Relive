const mongoose = require("mongoose");

mongoose.connect(require("./db").uri, require("./db").options);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

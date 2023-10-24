const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  video: [
    {
      type: String,
    },
  ],
  image: [
    {
      type: String,
    },
  ],
  problem: [
    {
      type: String,
    },
  ],
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;

const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    video: {
      type: String,
    },
    image: [
      {
        type: String,
        default: "",
      },
    ],
    specialCondition: {
      type: String,
      default: "",
    },
    upperproblem: [],
    lowerproblem: [],
    angles: [],
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;

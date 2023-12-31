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
    description: {
      type: String,
      default: "",
    },
    equipment: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;

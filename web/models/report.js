const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "doctor",
    },
    advice: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;

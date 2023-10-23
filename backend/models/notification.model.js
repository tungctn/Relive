const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String },
    content: { type: String },
    time: {
      hour: { type: Number },
      minute: { type: Number },
    },
    start: {
      type: String,
    },
    deviceToken: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);

const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 2,
    },
    notification: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const tusuwSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    tuluw: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "odoo"],
      default: "Pending",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tusuw", tusuwSchema);

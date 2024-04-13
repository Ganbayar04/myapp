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
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tusuw", tusuwSchema);

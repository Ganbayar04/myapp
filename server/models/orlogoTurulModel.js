const mongoose = require("mongoose");

const orlogoTurulModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrlogoTurul", orlogoTurulModel);

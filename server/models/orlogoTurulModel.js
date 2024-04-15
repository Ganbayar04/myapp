const mongoose = require("mongoose");

const orlogoTurulModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("OrlogoTurul", orlogoTurulModel);

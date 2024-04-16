const mongoose = require("mongoose");

const zarlagaTurulModel = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("ZarlagaTurul", zarlagaTurulModel);

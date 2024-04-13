// dansTurul.js
const mongoose = require("mongoose");

const DansTurulSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const DansTurul = mongoose.model("DansTurul", DansTurulSchema);
module.exports = DansTurul;

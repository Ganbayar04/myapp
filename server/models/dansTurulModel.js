// dansTurul.js
const mongoose = require("mongoose");

const DansTurul = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Turul = mongoose.model("DansTurul", DansTurul);
module.exports = Turul;

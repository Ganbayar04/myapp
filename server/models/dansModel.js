const mongoose = require("mongoose");

const dansSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  turul_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DansTurul",
    required: true,
  },
  uldegdel: {
    type: Number,
    required: true,
    default: 0,
  },
  tailbar: {
    type: String,
    required: false,
  },
  accountStatus: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
});

module.exports = mongoose.model("Dans", dansSchema);

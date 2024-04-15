const mongoose = require("mongoose");

const zeelDansSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("zeelDans", zeelDansSchema);

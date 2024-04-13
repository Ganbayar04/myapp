const mongoose = require("mongoose");

const TuluwluguutOrlogoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tailbar: {
      type: String,
      required: true,
    },
    dun: {
      type: Number,
      required: true,
    },
    tusuw_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tusuw",
      required: true,
    },
    guitsetgel: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TuluwluguutOrlogo", TuluwluguutOrlogoSchema);

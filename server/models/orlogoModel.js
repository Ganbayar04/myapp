const mongoose = require("mongoose");

const OrlogoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    dans_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dans",
      require: true,
    },
    orlogo_turul_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrlogoTurul",
      require: true,
    },
    t_orlogo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TuluwluguutOrlogo",
      require: true,
    },
    dun: {
      type: Number,
      require: true,
    },
    tailbar: {
      type: String,
      require: true,
    },
    ognoo: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Orlogo", OrlogoSchema);

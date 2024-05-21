const mongoose = require("mongoose");

const ZarlagaSchema = new mongoose.Schema(
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
    zarlaga_turul_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ZarlagaTurul",
      require: true,
    },
    t_zarlaga_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TuluwluguutZarlaga",
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Zarlaga", ZarlagaSchema);

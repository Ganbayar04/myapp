const mongoose = require("mongoose");

const TuluwluguutZarlagaSchema = new mongoose.Schema(
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
    // Зээл_данс_ID - Model үүсгээгүй байгаа...
    // zeel_dans_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "zeel",
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TuluwluguutZarlaga", TuluwluguutZarlagaSchema);

const mongoose = require("mongoose");

const dansSchema = new mongoose.Schema({
  name: { type: String, required: true },
  uldegdel: { type: Number, required: true, default: 0 },
  tailbar: { type: String },
  accountStatus: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  account_id: { type: mongoose.Schema.Types.ObjectId },
   turul_id: { type: mongoose.Schema.Types.ObjectId, ref: 'DansTurul' }
});


module.exports = mongoose.model("Dans", dansSchema);

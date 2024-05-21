const mongoose = require('mongoose');

const OrlogoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dans_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dans',
    required: true,
  },
  orlogo_turul_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrlogoTurul',
    required: true,
  },
  t_orlogo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TuluwluguutOrlogo',
    required: false,
  },
  dun: {
    type: Number,
    required: true,
  },
  tailbar: {
    type: String,
    required: false,
  },
  ognoo: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = new mongoose.model("Orlogo", OrlogoSchema);

const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: String,
  level: String,
  message: String,
  detectedFake: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);

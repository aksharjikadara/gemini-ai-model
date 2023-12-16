const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  prompt: {
    type: String,
  },
  res: {
    type: String,
  },
  reqIp: {
    type: String,
  },
  os: {
    type: String,
  },
  browser: {
    type: String,
  },
  deviceType: {
    type: String,
  },
  userAgent: {
    type: Object,
  },
});

module.exports = mongoose.model('Prompt', promptSchema);

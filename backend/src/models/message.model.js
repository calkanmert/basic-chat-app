const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  room: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  author: {
    type: String,
    required: true,
    min: 3,
  },
  content: {
    type: String,
    required: true,
  },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Message', MessageSchema);

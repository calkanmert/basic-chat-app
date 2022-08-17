const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Room', RoomSchema);

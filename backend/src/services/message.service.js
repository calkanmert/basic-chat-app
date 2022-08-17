const sanitizer = require('sanitizer');
const MessageModel = require('../models/message.model');

function create(room, author, content) {
  return new MessageModel({
    room: sanitizer.escape(room),
    author: sanitizer.escape(author),
    content: sanitizer.escape(content),
  }).save();
}

async function get(room, skip, limit) {
  const messages = await MessageModel.find({ room }).skip(skip).limit(limit).sort({ createdAt: 'asc' });
  return messages;
}

module.exports = {
  create,
  get,
};

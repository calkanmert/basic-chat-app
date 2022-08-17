const roomService = require('../services/room.service');
const messageService = require('../services/message.service');

async function getRooms(req, res) {
  const rooms = await roomService.getAll();
  res.json(rooms);
}

async function getMessages(req, res) {
  const skip = req.query.skip || 0;
  const limit = req.query.limit || false;
  const messages = await messageService.get(req.params.room, skip, limit);
  res.send(messages);
}

module.exports = {
  getRooms,
  getMessages,
};

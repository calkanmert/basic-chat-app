const RoomModel = require('../models/room.model');

async function getAll() {
  const rooms = await RoomModel.find().sort({ createdAt: 'asc' });
  return rooms;
}

module.exports = {
  getAll,
};

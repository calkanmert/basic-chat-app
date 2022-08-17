const connectDb = require('../core/mongoose');
const RoomModel = require('../models/room.model');
const rooms = require('./rooms');

connectDb();

async function run() {
  await RoomModel.insertMany(rooms);
}

async function reverse() {
  await RoomModel.deleteMany({});
}

(async () => {
  if (process.argv.pop() !== '-d') {
    await run();
    console.log('- created -');
  } else {
    await reverse();
    console.log('- deleted -');
  }
  process.exit();
})();

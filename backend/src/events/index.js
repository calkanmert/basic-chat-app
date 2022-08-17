const { EventEmitter } = require('events');
const messageService = require('../services/message.service');

const eventEmitter = new EventEmitter();

eventEmitter.on('io', (io) => {
  io.on('connection', (socket) => {
    socket.on('join', (username) => {
      if (username.length > 3) socket.emit('welcome', { id: socket.id });
      else socket.emit('alert', { icon: 'error', title: 'Error!', text: 'Username length must be greater than 3.' });
    });
    socket.on('new_message', async (args) => {
      const message = await messageService.create(args.room, args.author, args.content);
      if (message) io.emit('new_message', { sender: socket.id, ...message._doc });
    });
  });
});

module.exports = eventEmitter;

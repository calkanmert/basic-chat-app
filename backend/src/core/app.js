const http = require('http');
const express = require('express');
const socket = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const connectDb = require('./mongoose');
const eventEmitter = require('../events');
const routes = require('../routes');

connectDb();

const app = express();
const server = http.createServer(app);

eventEmitter.emit('io', socket(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
}));

app.use(cors());
app.use(helmet());
app.get('/', (req, res) => {
  res.send('<h1>CHAT-APP BACKEND SERVER</h1>');
});
app.use('/rooms', routes.room);
app.use((req, res) => {
  res.status(404).send({ status: 404 });
});

module.exports = server;

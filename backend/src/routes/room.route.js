const express = require('express');
const roomController = require('../controllers/room.controller');

const router = new express.Router();

router.get('/', roomController.getRooms);
router.get('/:room/messages', roomController.getMessages);

module.exports = router;

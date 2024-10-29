const express = require('express');
const router = express.Router();
const { getRooms, getRoomById } = require('../controllers/roomController');
router.get('/api/rooms', getRooms);
router.get('/api/rooms/:id', getRoomById);
module.exports = router;
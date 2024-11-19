const express = require('express');
const router = express.Router();
const { getRooms, getRoomById, getIdRoom } = require('../controllers/roomController');
router.get('/api/rooms', getRooms);
router.get('/api/rooms/:id', getRoomById);
router.put('/api/getIdRoom', getIdRoom);
module.exports = router;
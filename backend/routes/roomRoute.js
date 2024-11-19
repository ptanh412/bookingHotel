const express = require('express');
const router = express.Router();
const { getRooms, getRoomById, getIdRoom, searchRooms } = require('../controllers/roomController');
router.get('/api/rooms', getRooms);
router.get('/api/rooms/:id', getRoomById);
router.put('/api/getIdRoom', getIdRoom);
router.post('/api/rooms/searchRoom', searchRooms);
module.exports = router;
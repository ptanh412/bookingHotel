const express = require('express');
const router = express.Router();
const { getTypeRoom } = require('../controllers/typeRoomController');
router.get('/api/typeRoom', getTypeRoom);
module.exports = router;
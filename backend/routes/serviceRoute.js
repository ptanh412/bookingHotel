const express = require('express');
const router = express.Router();
const { getAllServices } = require('../controllers/serviceController');
router.get('/api/services', getAllServices);
module.exports = router;
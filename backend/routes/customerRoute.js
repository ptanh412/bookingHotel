const express = require('express');
const router = express.Router();
const {createOrUpdateCustomer, getCustByUserId, getCustByPrimary } = require('../controllers/customerController');
router.post('/api/createOrUpdateCustomer', createOrUpdateCustomer);
router.get('/api/getCustByUserId/:userId', getCustByUserId);
router.get('/api/customerByPrimary', getCustByPrimary);
module.exports = router;
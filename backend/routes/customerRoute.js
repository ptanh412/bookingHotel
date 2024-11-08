const express = require('express');
const router = express.Router();
const {createOrUpdateCustomer, getCustByUserId, getCustByPrimary, getALlCustomer } = require('../controllers/customerController');
router.post('/api/createOrUpdateCustomer', createOrUpdateCustomer);
router.get('/api/getCustByUserId/:userId', getCustByUserId);
router.get('/api/customerByPrimary', getCustByPrimary);
router.get('/api/allCustomer', getALlCustomer);
module.exports = router;
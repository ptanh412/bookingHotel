const express = require('express');
const router = express.Router();
const { getPayment,getPaymentPending, confirmPayment } = require('../controllers/paymenCotroller');
router.get('/api/payment', getPayment);
router.get('/api/paymentPending', getPaymentPending);
router.put('/api/:id/confirmPayment', confirmPayment);
module.exports = router;
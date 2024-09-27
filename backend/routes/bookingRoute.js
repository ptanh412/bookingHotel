const express = require('express');
const router = express.Router();
const { getBookings, getNewBooked, confirmBooking } = require('../controllers/bookingController');
router.get('/api/bookings', getBookings);
router.get('/api/newBooked', getNewBooked);
router.put('/api/:id/confirmBooking', confirmBooking);
module.exports = router;
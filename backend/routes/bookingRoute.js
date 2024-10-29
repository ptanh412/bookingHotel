const express = require('express');
const router = express.Router();
const { getBookings, getNewBooked, confirmBooking, createBooking } = require('../controllers/bookingController');
router.get('/api/bookings', getBookings);
router.get('/api/newBooked', getNewBooked);
router.put('/api/:id/confirmBooking', confirmBooking);
router.post('/api/createBooking', createBooking);
module.exports = router;
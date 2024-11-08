const express = require('express');
const router = express.Router();
const { getBookings, getNewBooked, confirmBooking, createBooking, getBookingByUserId, cancelUnpaidBookings, getBookingById, checkRoomAvailability} = require('../controllers/bookingController');
router.get('/api/bookings', getBookings);
router.get('/api/newBooked', getNewBooked);
router.put('/api/:id/confirmBooking', confirmBooking);
router.post('/api/createBooking', createBooking);
router.get('/api/bookings/:id', getBookingByUserId);
router.post('/api/cancelUnpaidBookings', cancelUnpaidBookings);
router.get('/api/detailBooking', getBookingById);
router.get('/api/checkRoomAvailability', checkRoomAvailability);
module.exports = router;
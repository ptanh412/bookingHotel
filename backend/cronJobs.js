// cronJobs.js
const cron = require('node-cron');
const { cancelUnpaidBookings } = require('./controllers/bookingController');

// Chạy mỗi giờ
cron.schedule('* * * * *', async () => {
    try {
        await cancelUnpaidBookings();
        console.log("Cancelled unpaid bookings");
    } catch (error) {
        console.error("Error cancelling unpaid bookings:", error);
    }
});

module.exports = cron;

const { sql } = require('../config/dbConfig');

const getBookings = async (req, res) => {
    try {
        const result = await sql.query`SELECT booking.*, users.fullName, room.name
                                        FROM booking
                                        JOIN users ON booking.user_id = users.id
                                        JOIN room ON booking.room_id = room.id;`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
}
const getNewBooked = async (req, res) => {
    try {
        const result = await sql.query`SELECT booking.*, users.fullName, room.name
                                        FROM booking
                                        JOIN users ON booking.user_id = users.id
                                        JOIN room ON booking.room_id = room.id
                                        WHERE booking.status = 'pending';`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
}
const confirmBooking = async (req, res) => {
    try {
        const result = await sql.query`UPDATE booking SET status = 'confirmed' WHERE id = ${req.params.id};`;
        if (result.rowsAffected[0] > 0) {
            return res.json({ message: 'Booking confirmed successfully' });
        } else {
            return res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error confirming booking:', error);
        res.status(500).send('Error confirming booking');
    }
}
module.exports = { getBookings, getNewBooked, confirmBooking};
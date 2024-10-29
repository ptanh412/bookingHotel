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
const createBooking = async (req, res) => {
    try {
        const { user_id, room_id, checkIn, checkOut, totalPrice, guest_count } = req.body;

        // Generate custom ID with format BYYYYMMDD
        const date = new Date();
        const seconds = String(date.getSeconds()).padStart(2, '0'); // Định dạng giây với 2 chữ số
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Định dạng phút với 2 chữ số
        const bookingId = `B${seconds}${minutes}`; // Tạo id với format BSSMM

        const result = await sql.query`
            INSERT INTO bookings (id, user_id, room_id, check_in, check_out, total_amount, guest_count, status)
            VALUES (${bookingId}, ${user_id}, ${room_id}, ${checkIn}, ${checkOut}, ${totalPrice}, ${guest_count}, 'pending');
        `;

        res.json({ message: "Booking created successfully", bookingId });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send('Error creating booking');
    }
};

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
module.exports = { getBookings, getNewBooked, confirmBooking, createBooking };
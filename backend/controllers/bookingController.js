const { sql } = require('../config/dbConfig');

const getBookings = async (req, res) => {
    try {
        const result = await sql.query`SELECT bookings.*, customers.fullName as fullName, rooms.name as roomName
                                        FROM bookings
                                        JOIN customers ON bookings.customer_id = customers.id
                                        JOIN rooms ON bookings.room_id = rooms.id;`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
}
const getBookingByUserId = async (req, res) => {
    try {
        const result = await sql.query`SELECT bookings.*, customers.fullName as fullName, rooms.name as roomName, customers.phoneNumber as phone, customers.idCard as idCard
                                        FROM bookings
                                        JOIN customers ON customers.id = bookings.customer_id
                                        JOIN users ON users.id = customers.user_id
                                        JOIN rooms ON bookings.room_id = rooms.id
                                        WHERE bookings.user_id =  ${req.params.id};`;
        res.json(result.recordset);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
}
const getBookingById = async (req, res) => {
    try {
        const bookingId = req.query.bookingId;
        const result = await sql.query`SELECT bookings.*, customers.fullName as fullName, rooms.name as roomName, customers.phoneNumber as phone, customers.idCard as idCard, payments.payment_method as method, payments.form as form
                                        FROM bookings
                                        LEFT JOIN payments on bookings.id = payments.booking_id
                                        JOIN customers ON customers.id = bookings.customer_id
                                        JOIN users ON users.id = customers.user_id
                                        JOIN rooms ON bookings.room_id = rooms.id WHERE bookings.id = ${bookingId};`;
        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
}
const getNewBooked = async (req, res) => {
    try {
        const { roomId, bookingId } = req.query; // Lấy roomId và bookingId từ query params

        const result = await sql.query`
            SELECT bookings.*, rooms.name
            FROM bookings
            JOIN users ON bookings.user_id = users.id
            JOIN rooms ON bookings.room_id = rooms.id
            WHERE bookings.status = 'pending'
            AND bookings.id = ${bookingId}
            AND rooms.id = ${roomId};
        `;

        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
}

const createBooking = async (req, res) => {
    try {
        const { user_id, room_id, checkIn, checkOut, totalPrice, guest_count } = req.body;

        // Truy vấn ID lớn nhất hiện tại
        const maxIdResult = await sql.query`SELECT MAX(id) as maxId FROM bookings`;
        const maxId = maxIdResult.recordset[0].maxId;

        // Tạo ID mới
        let newId;
        if (maxId) {
            const numericPart = parseInt(maxId.replace('B', ''), 10);
            newId = `B${numericPart + 1}`;
        } else {
            newId = 'B001';
        }

        // Thực hiện chèn booking mới
        await sql.query`
            INSERT INTO bookings (id, user_id, room_id, check_in, check_out, total_amount, guest_count, status)
            VALUES (${newId}, ${user_id}, ${room_id}, ${checkIn}, ${checkOut}, ${totalPrice}, ${guest_count}, 'pending');
        `;

        res.json({ message: "Booking created successfully", bookingId: newId });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send('Error creating booking');
    }
};

const checkRoomAvailability = async (req, res) => { 
    const { room_id, checkIn, checkOut } = req.query; // Lấy tham số từ req.query
    try {
        const result = await sql.query`EXEC sp_CheckRoomAvailability ${room_id}, ${checkIn}, ${checkOut};`; // Truyền tham số vào stored procedure
        res.json({ message: result.recordset[0].Message }); // Trả về thông điệp
    } catch (error) {
        console.error('Error checking booking:', error);
        res.status(500).send('Error checking booking');
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
const cancelUnpaidBookings = async () => {
    try {
        await sql.query`EXEC sp_cancel_unpaid_bookings;`;
    } catch (error) {
        console.error('Error cancelling unpaid bookings:', error);
    }
};

module.exports = { getBookings, getNewBooked, confirmBooking, createBooking, getBookingByUserId , cancelUnpaidBookings, getBookingById, checkRoomAvailability};
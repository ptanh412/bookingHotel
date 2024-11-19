const {sql} = require('../config/dbConfig');
const nodemailer = require('nodemailer');

const getPayment =async (req, res) =>{
    try {
        const result = await sql.query`SELECT * FROM payment;`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
}
const getPaymentPending =async (req, res) =>{
    try {
        const result = await sql.query`SELECT * FROM payment WHERE status = 'pending';`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
}
const confirmPayment = async (req, res) =>{
    try {
        const result = await sql.query`UPDATE payment SET status = 'completed' WHERE id = ${req.params.id};`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error confirming payment:', error);
        res.status(500).send('Error confirming payment');
    }
}
const sendPaymentEmail = async (recipientEmail, bookingDetails) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Định dạng ngày tháng thành dd/mm/yyyy
    const formattedCheckInDate = new Date(bookingDetails.checkInDate).toLocaleDateString('en-GB');
    const formattedCheckOutDate = new Date(bookingDetails.checkOutDate).toLocaleDateString('en-GB');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipientEmail,
        subject: 'Payment Confirmation',
        html: `
            <h3>Thank you for your payment!</h3>
            <p>Your booking details:</p>
            <ul>
                <li><strong>Booking Room ID:</strong> ${bookingDetails.booking_id}</li>
                <li><strong>Room:</strong> ${bookingDetails.roomName}</li>
                <li><strong>Check-in Date:</strong> ${formattedCheckInDate}</li>
                <li><strong>Check-out Date:</strong> ${formattedCheckOutDate}</li>
                <li><strong>Total Amount Paid:</strong> ${bookingDetails.amountPaid}</li>
            </ul>
        `
    };

    await transporter.sendMail(mailOptions);
};


const createPayment = async (req, res) => {
    try {
        const { booking_id, payment_method, amount_paid, form, email, roomName, checkInDate, checkOutDate } = req.body;

        // Thực hiện lưu thông tin thanh toán vào cơ sở dữ liệu
        const result = await sql.query`
            INSERT INTO payments (booking_id, payment_method, amount_paid, form)
            VALUES (${booking_id}, ${payment_method}, ${amount_paid}, ${form});
        `;

        // Tạo thông tin booking để gửi email
        const bookingDetails = {
            booking_id,
            roomName,
            checkInDate,
            checkOutDate,
            amountPaid: amount_paid
        };

        // Gửi email xác nhận
        await sendPaymentEmail(email, bookingDetails);

        res.json({ message: "Payment processed and email sent successfully" });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).send('Error creating payment');
    }
};


module.exports = {getPayment, confirmPayment, getPaymentPending, createPayment};
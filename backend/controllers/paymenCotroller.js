const {sql} = require('../config/dbConfig');

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
const createPayment = async (req, res) =>{
    try {
        const { booking_id, payment_method, amount_paid, form} = req.body;
        const result = await sql.query`
            INSERT INTO payments (booking_id, payment_method, amount_paid, form)
            VALUES (${booking_id}, ${payment_method}, ${amount_paid}, ${form});
        `;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).send('Error creating payment');
    }
}
module.exports = {getPayment, confirmPayment, getPaymentPending, createPayment};
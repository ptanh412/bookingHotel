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
module.exports = {getPayment, confirmPayment, getPaymentPending};
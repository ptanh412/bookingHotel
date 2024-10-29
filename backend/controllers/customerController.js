const { sql } = require('../config/dbConfig');
const createCustomer = async (req, res) => {
    try {
        const { name, email, phone, idCard, sex } = req.body;
        const result = await sql.query`
            INSERT INTO customers (name, email, phone, idCard)
            VALUES (${name}, ${email}, ${phone}, ${idCard}, ${sex});
        `;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).send('Error creating customer');
    }
}
module.exports = {createCustomer};
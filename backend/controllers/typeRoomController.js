const {sql} = require('../config/dbConfig');

const getTypeRoom =async (req, res) =>{
    try {
        const result = await sql.query`SELECT * FROM type_room`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
}
module.exports = {getTypeRoom};
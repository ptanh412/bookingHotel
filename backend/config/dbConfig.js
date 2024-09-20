const sql = require('mssql');
require('dotenv').config();


const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        enableArithAbort: true,
        encrypt: true,
        trustServerCertificate: true
      }
}
async function connectToDb() {
    try {
        await sql.connect(dbConfig);
        console.log('Connected to database');
    } catch (error) {
        console.log('Error: ' + error);
    }
}
module.exports = {
    sql,
    connectToDb
};
const {sql} = require('../config/dbConfig');
const brcypt = require('bcrypt');
const getUsers = async (req, res) =>{
    try {
        const result = await sql.query`SELECT * FROM users`;
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
}
const postUser = async (req,res) =>{
    try {
        const {email, password} = req.body;
        const saltRounds = 10;
        const hashedPass = await brcypt.hash(password, saltRounds);
        const result = await sql.query`INSERT INTO users (email, password) VALUES (${email},${hashedPass})`;
        res.json(result);
    } catch (error) {
        console.error('Error register:', error);
        res.status(500).send('Error register');
    }
}
const loginUser = async (req,res) =>{
    try {
        const {email, password} = req.body;
        const result = await sql.query`SELECT * FROM users WHERE email = ${email}`;
        const user = result.recordset[0];
        if(!user){
            return res.status(404).send('User not found');
        }
        const isPasswordValid = await brcypt.compare(password, user.password);
        if (!isPasswordValid){
            return res.status(401).send('Invalid password');
        }
        res.json(user);
    } catch (error) {
        console.error('Error login data:', error);
        res.status(500).send('Error login data');
    }
}
module.exports = {getUsers, postUser, loginUser};
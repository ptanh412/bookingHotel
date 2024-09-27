const express = require('express');
const router = express.Router();
const { getUsers, postUser, loginUser } = require('../controllers/userController');
router.get('/api/users', getUsers);
router.post('/api/register', postUser);
router.post('/api/login', loginUser);

module.exports = router;
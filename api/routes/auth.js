const express = require('express');
const { createUser } = require('../controllers/auth');

const router = express.Router();

router.post('/register', createUser);

module.exports = router;
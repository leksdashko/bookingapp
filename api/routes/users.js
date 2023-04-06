const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('auth');
});
router.get('/register', (req, res) => {
	res.send('register');
});


module.exports = router;
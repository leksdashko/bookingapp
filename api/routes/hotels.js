const express = require('express');
const { createHotel, updateHotel, deleteHotel, getHotel, getHotels, countByCity, countByType } = require('../controllers/hotel');
const { verifyAdmin } = require('../utils/verifyToken');


const router = express.Router();

//CREATE
router.post('/', verifyAdmin, createHotel);

//UPDATE
router.put('/:id', verifyAdmin, updateHotel);

//DELETE
router.delete('/:id', verifyAdmin, deleteHotel);

router.get('/countByCity', countByCity);
router.get('/countByType', countByType);

//GET
router.get('/:id', getHotel);

//GET ALL
router.get('/', getHotels);

module.exports = router;
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const { createError } = require('../utils/error');

const createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;
	const newRoom = new Room(req.body);

	try {
		const savedRoom = await newRoom.save();

		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$push: { rooms: savedRoom._id }
			});
		} catch (err) {
			next(err);
		}
		res.status(200).json(savedRoom);
	} catch (err) {
		next(err);
	}
}

const updateRoom = async (req, res, next) => {
	try {
		const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true});
		res.status(200).json(updatedRoom);
	}catch(err){
		next(err);
	}
}

const deleteRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;

	try {
		await Room.findByIdAndDelete(req.params.id);

		try {
			await Hotel.findByIdAndUpdate(hotelId, {
				$pull: { rooms: req.params.id }
			});
		} catch (err) {
			next(err);
		}

		res.status(200).json("Room has been deleted.");
	}catch(err){
		next(err);
	}
}

const getRoom = async (req, res, next) => {
	try {
		const Room = await Room.findById(req.params.id);
		res.status(200).json(Room);
	}catch(err){
		next(err);
	}
}

const getRooms = async (req, res, next) => {
	try {
		const Rooms = await Room.find();
		res.status(200).json(Rooms);
	}catch(err){
		next(err);
	}
}

module.exports = {
	createRoom,
	updateRoom,
	deleteRoom,
	getRoom,
	getRooms
}
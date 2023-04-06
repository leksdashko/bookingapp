const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const hotelsRouter = require('./routes/hotels');
const roomsRouter = require('./routes/rooms');

const app = express();
dotenv.config();

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO);
		console.log("Connected to MongoDB.");
	} catch (e) {
		throw e
	} 
}

mongoose.connection.on("disconnected", () => {
	console.log("mongoDB was disconnected");
});

//middlewares
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);

app.listen(8800, () => {
	connect();
	console.log('Connected to backend.');
});
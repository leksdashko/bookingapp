const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const hotelsRouter = require('./routes/hotels');
const roomsRouter = require('./routes/rooms');
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/hotels', hotelsRouter);
app.use('/api/rooms', roomsRouter);

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wrong!";

	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack
	});
});

app.listen(8800, () => {
	connect();
	console.log('Connected to backend.');
});
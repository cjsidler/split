const mongoose = require("mongoose");
const { receiptSchema } = require("./receipt.js");
require("dotenv").config();

mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
});

const db = mongoose.connection;

db.once("open", () => {
	console.log("Successfully connected to MongoDB using Mongoose!");
});

// Define Schema
const userSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	email: { type: String, required: false, unique: true },
	receipts: [receiptSchema],
});

const User = mongoose.model("User", userSchema);

// Create a new user mongodb function
const createUser = async (username, password, email) => {
	const user = new User({
		username: username,
		password: password,
		email: email,
	});
	return user.save();
};

// Get all users mongodb function
const findUsers = async () => {
	const query = User.find();
	const result = await query.exec();
	return result;
};

// Get a user by their username mongodb function
const findUser = async (username) => {
	const query = User.findOne({ username: username });
	const result = await query.exec();
	return result;
};

module.exports = {
	User,
	createUser,
	findUsers,
	findUser,
};

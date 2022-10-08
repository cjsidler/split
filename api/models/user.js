const mongoose = require("mongoose");
require("dotenv").config();

console.log("DATABASE URI: ", process.env.DB_URI);

mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
});

const db = mongoose.connection;

db.once("open", () => {
	console.log("Successfully connected to MongoDB using Mongoose!");
});

// mongoose.set("useCreateIndex", true);

// Define Schema
const userSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: Number, required: false },
});

const User = mongoose.model("User", userSchema);

const createUser = async (username, password, email) => {
	const user = new Exercise({
		username: username,
		password: password,
		email: email,
	});
	return user.save();
};

// const findExercises = async () => {
// 	const query = Exercise.find();
// 	const result = await query.exec();
// 	return result;
// };

// const findExercise = async (id) => {
// 	const query = Exercise.findOne({ _id: id });
// 	const result = await query.exec();
// 	return result;
// };

// const updateExercise = async (filter, newData) => {
// 	const result = await Exercise.findOneAndUpdate(filter, newData, {
// 		new: true,
// 		useFindAndModify: false,
// 	});
// 	return result;
// };

// const deleteExercise = async (_id) => {
// 	const result = await Exercise.deleteOne({ _id });
// 	return result.deletedCount;
// };

module.exports = {
	User,
	createUser,
	// findExercises,
	// findExercise,
	// deleteExercise,
	// updateExercise,
};

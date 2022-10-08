import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Connection to the Atlas DB
mongoose.connect(
	"mongodb+srv://mattlamDB:SaWzAYjznnpjiglH@cluster0.dlleb.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.once("open", () => {
	console.log("Successfully connected to MongoDB using Mongoose!");
});

// Define Schema
const userSchema = new Schema({
	username: String,
	name: String,
	password: String,
});

const User = model("User", userSchema);

// Will need to export as modules when there is added functions above
export default User;

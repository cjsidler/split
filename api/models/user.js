const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// Define Schema
const lineItemSchema = new mongoose.Schema({
    description: { type: String },
    quantity: { type: Number },
    total: { type: Number },
});

const vendorSchema = new mongoose.Schema({
    name: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
});

const receiptSchema = new mongoose.Schema({
    date: { type: String },
    image_url: { type: String },
    line_items: [lineItemSchema],
    tax: { type: Number },
    subtotal: { type: Number },
    tip: { type: Number },
    total: { type: Number },
    vendor: [vendorSchema],
});

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    receipts: [receiptSchema],
});

const User = mongoose.model("User", userSchema);

const createUser = async (username, password, email) => {
    const user = new User({
        username: username,
        password: password,
        email: email,
    });
    return user.save();
};

const findUsers = async () => {
    const query = User.find();
    const result = await query.exec();
    return result;
};

const findUser = async (username) => {
    const query = User.findOne({ username: username });
    const result = await query.exec();
    return result;
};

// const updateUser = async (filter, newData) => {
// 	const result = await User.findOneAndUpdate(filter, newData, {
// 		new: true,
// 		useFindAndModify: false,
// 	});
// 	return result;
// };

// const deleteUser = async (_id) => {
// 	const result = await User.deleteOne({ _id });
// 	return result.deletedCount;
// };

module.exports = {
    User,
    createUser,
    findUsers,
    findUser,
    // deleteUser,
    // updateUser,
};

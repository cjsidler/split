const mongoose = require("mongoose");
const { lineItemSchema } = require("./lineItem.js");
const { vendorSchema } = require("./vendor.js");
require("dotenv").config();

mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
});

const db = mongoose.connection;

db.once("open", () => {
	console.log("Successfully connected to MongoDB using Mongoose!");
});

// const Vendor = mongoose.model("Vendor", vendorSchema);

// Define Schema
const receiptSchema = new mongoose.Schema({
	date: { type: String },
	image_url: { type: String },
	line_items: [lineItemSchema],
	tax: { type: Number },
	subtotal: { type: Number },
	tip: { type: Number },
	total: { type: Number },
	vendor: vendorSchema,
});

const Receipt = mongoose.model("Receipt", receiptSchema);

const createReceipt = async (
	date,
	image_url,
	line_items,
	tax,
	subtotal,
	tip,
	total,
	vendor
) => {
	const receipt = new Receipt({
		date: date,
		image_url: image_url,
		line_items: line_items,
		tax: tax,
		subtotal: subtotal,
		tip: tip,
		total: total,
		vendor: vendor,
	});
	return receipt.save();
};

/*
    Get all receipts
*/
const findReceipts = async () => {
	const query = Receipt.find();
	const result = await query.exec();
	return result;
};

/*
    Get a receipt by /:id
*/
const findReceipt = async (id) => {
	const query = Receipt.findOne({ _id: id });
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
	receiptSchema,
	Receipt,
	createReceipt,
	findReceipts,
	findReceipt,
	// deleteReceipt,
	// updateReceipt,
};

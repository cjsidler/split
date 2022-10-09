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

// Define Schema
const receiptSchema = new mongoose.Schema({
	userId: { type: String },
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
const LineItem = mongoose.model("LineItem", lineItemSchema);
const Vendor = mongoose.model("Vendor", vendorSchema);

const createReceipt = async (data, userId) => {
	const vendor = new Vendor({
		name: data.vendor.name,
		phoneNumber: data.vendor.phoneNumber,
		address: data.vendor.address,
	});

	// Create array of line items
	const lineItems = data.line_items.map((item) => {
		const line_item = new LineItem({
			description: item.description,
			quantity: item.quantity,
			total: item.total,
		});

		return line_item;
	});

	const receipt = new Receipt({
		userId: userId,
		date: data.date,
		image_url: data.image_url,
		line_items: lineItems,
		tax: data.tax,
		subtotal: data.subtotal,
		tip: data.tip,
		total: data.total,
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

/*
	Delete a receipt by /:id
*/
const deleteReceipt = async (_id) => {
	const result = await Receipt.deleteOne({ _id });
	return result.deletedCount;
};

// const updateUser = async (filter, newData) => {
// 	const result = await User.findOneAndUpdate(filter, newData, {
// 		new: true,
// 		useFindAndModify: false,
// 	});
// 	return result;
// };

module.exports = {
	receiptSchema,
	Receipt,
	createReceipt,
	findReceipts,
	findReceipt,
	deleteReceipt,
	// updateReceipt,
};

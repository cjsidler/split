const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
	name: { type: String },
	phoneNumber: { type: String },
	address: { type: String },
});

module.exports = { vendorSchema };

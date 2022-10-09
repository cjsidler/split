const mongoose = require("mongoose");

// Sub-Schema used in Receipt model
const vendorSchema = new mongoose.Schema({
	name: { type: String },
	phoneNumber: { type: String },
	address: { type: String },
});

module.exports = { vendorSchema };

const mongoose = require("mongoose");

// Sub-Schema used in Receipt model
const lineItemSchema = new mongoose.Schema({
	description: { type: String },
	quantity: { type: Number },
	total: { type: Number },
});

module.exports = { lineItemSchema };

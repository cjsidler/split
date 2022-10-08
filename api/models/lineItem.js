const mongoose = require("mongoose");

const lineItemSchema = new mongoose.Schema({
    description: { type: String },
    quantity: { type: Number },
    total: { type: Number },
});

module.exports = lineItemSchema;

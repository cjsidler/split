const mongoose = require("mongoose");
const lineItemSchema = require("./lineItem");
const vendorSchema = require("./vendor");

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

module.exports = receiptSchema;

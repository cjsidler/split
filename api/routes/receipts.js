const bcrypt = require("bcrypt");
const express = require("express");
const router = require("express").Router();
var jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const { User, createUser, findUsers, findUser } = require("../models/user.js");

const {
	Receipt,
	createReceipt,
	findReceipts,
	findReceipt,
} = require("../models/receipt.js");

require("dotenv").config();

/*
    Get list of all Receipts
*/
router.get("/", async (req, res, next) => {
	// Get list of all users
	try {
		const receipts = await findReceipts();
		res.status(200).send(receipts);
	} catch (err) {
		res.status(500).send(err);
	}
});

/*
    Get a single receipt by id
*/
router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const receipt = await findReceipt(id);
		res.status(200).send(receipt);
	} catch (err) {
		res.status(500).send(err);
	}
});

/*
    Save a receipt to db
*/
router.post("/", async (req, res, next) => {
	try {
		// Pull off token from request header to get  user
		// Check that token is valid w/ isLoggedIn middleware
		// Get json back from veryfi api - use result.json as dummy data
		const authHeader = req.headers.authorization;

		const token = authHeader.replace("Bearer ", "");
		// Verify that token is valid
		const validToken = jwt.verify(token, JWT_SECRET);
		// Decode token & grab username
		const username = jwt.decode(token).username;

		const foundUser = await findUser(username);
		const userId = foundUser._id.toString();

		const filePath = path.join(__dirname, "../uploads") + "/result.json";

		// Open & Read json file that we saved from veryfi api response
		fs.readFile(filePath, async (err, data) => {
			if (err) throw err;
			// Convert data to JSON
			let jsonData = JSON.parse(data);

			// Save receipt data to db
			const newReceipt = await createReceipt(jsonData, userId);

			console.log(newReceipt);

			res.json({ data: jsonData });
		});
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;

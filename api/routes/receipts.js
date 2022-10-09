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
	deleteReceipt,
} = require("../models/receipt.js");

require("dotenv").config();

// ------------------------ EXPRESS MIDDLEWARE --------------------------
/*
	- Check if user's token is valid before ALL requests
*/
const isLoggedIn = async (req, res, next) => {
	try {
		// Remove 'Bearer' from token
		const authHeaderValue = req.headers.authorization.slice(7);

		// Verify that token is valid
		const token = jwt.verify(authHeaderValue, JWT_SECRET);
		// Decode token & grab username
		const username = jwt.decode(authHeaderValue).username;
		// Check that user is a valid row in db
		const foundUser = await findUser(username);

		return next();
	} catch (e) {
		// Invalid token
		return res.status(401).json({ message: "Unauthorized" });
	}
};

/*
    Get list of all Receipts
*/
router.get("/", isLoggedIn, async (req, res, next) => {
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
router.get("/:id", isLoggedIn, async (req, res, next) => {
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
router.post("/", isLoggedIn, async (req, res, next) => {
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

/*
    Delete a single receipt by id
*/
router.delete("/:id", isLoggedIn, async (req, res, next) => {
	try {
		const { id } = req.params;
		const receipt = await deleteReceipt(id);
		res.json({ message: "Receipt successfully deleted" });
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;

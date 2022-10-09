const bcrypt = require("bcrypt");
const express = require("express");
const router = require("express").Router();
var jwt = require("jsonwebtoken");

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

// /*
//     Signup Route
// */
// router.post("/", async (req, res, next) => {
// 	// Save user to db
// 	try {
// 		const { username, password, email } = req.body;

// 		let newUser;

// 		if (username && password) {
// 			// Need to hash pw here & issue JWT back to client

// 			const hashedPw = await bcrypt.hash(password, 10);

// 			newUser = await createUser(username, hashedPw, email);
// 			// Create token & include username
// 			const token = jwt.sign(
// 				{
// 					username: username,
// 					email: email,
// 				},
// 				JWT_SECRET,
// 				{ expiresIn: 60 * 60 }
// 			);

// 			res.json({ token });
// 		} else {
// 			res.status(400).send({ error: "All fields are required" });
// 		}
// 	} catch (err) {
// 		res.status(500).send(err);
// 	}

// 	// res.json({ message: "Youve hit the login route" });
// });

module.exports = router;

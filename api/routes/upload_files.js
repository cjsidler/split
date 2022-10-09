const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");
const Client = require("@veryfi/veryfi-sdk");
const sample_ocr_response = require("../uploads/result.json");
var jwt = require("jsonwebtoken");

const router = require("express").Router();

const { findUser } = require("../models/user.js");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// ------------------------ EXPRESS MIDDLEWARE --------------------------

//Check if user's token is valid before ALL requests
const isLoggedIn = async (req, res, next) => {
	try {
		// Remove 'Bearer' from token
		const authHeaderValue = req.headers.authorization.slice(7);

		// Verify that token is valid
		const token = jwt.verify(authHeaderValue, JWT_SECRET);

		console.log(token);
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

// OCR API
// Commented code below is to save unnecessary requests to the API as we are limited to 50 requests total

// router.post("/", isLoggedIn, upload.single("file"), async (req, res) => {
// 	const veryfi_client = new Client(client_id, client_secret, username, api_key);
// 	try {
// 		const response = await veryfi_client.process_document(req.file.path);
// 		console.log(response.data);
// 		res.status(200).send(response.data);
// 	} catch (error) {
// 		console.log(error);
// 		res.json("error calling OCR API");
// 	}

// 	// Remove temporary file
// 	fs.unlink(req.file.path, (err) => {
// 		if (err) console.log(err);
// 	});
// });

router.post("/", isLoggedIn, async (req, res) => {
	res.json(sample_ocr_response);
});

module.exports = router;

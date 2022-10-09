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

// OCR API - Post request
router.post("/", isLoggedIn, async (req, res) => {
	res.json(sample_ocr_response);
});

module.exports = router;

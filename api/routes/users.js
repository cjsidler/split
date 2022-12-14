const bcrypt = require("bcrypt");
const router = require("express").Router();
var jwt = require("jsonwebtoken");

const { createUser, findUsers, findUser } = require("../models/user.js");

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


// Get route - list of all Users
router.get("/", isLoggedIn, async (req, res, next) => {
	// Get list of all users
	try {
		const users = await findUsers();
		res.status(200).send(users);
	} catch (err) {
		res.status(500).send(err);
	}
});

// Post route - to save new user signup to the database
router.post("/signup", async (req, res, next) => {
	// Save user to db
	try {
		const { username, password, email } = req.body;

		let newUser;

		if (username && password) {
			// Need to hash pw here & issue JWT back to client

			const hashedPw = await bcrypt.hash(password, 10);

			newUser = await createUser(username, hashedPw, email);
			// Create token & include username
			const token = jwt.sign(
				{
					username: username,
					email: email,
				},
				JWT_SECRET,
				{ expiresIn: 60 * 60 }
			);

			res.json({ token });
		} else {
			res.status(400).send({ error: "All fields are required" });
		}
	} catch (err) {
		res.status(500).send(err);
	}

	// res.json({ message: "Youve hit the login route" });
});


// Post route - to login the user and check if they are valid
router.post("/login", async (req, res, next) => {
	// Save user to db
	try {
		const { username, password } = req.body;

		// Make sure user exists in db
		const foundUser = await findUser(username);
		const foundPw = foundUser["password"];

		// compare hashedPw to unhashedPw
		const verifiedPw = await bcrypt.compare(password, foundPw);

		// invalid pw
		if (!verifiedPw) {
			return res.json({ message: "Invalid Password" });
		}

		// Create token & include username
		const token = jwt.sign(
			{
				username: username,
			},
			JWT_SECRET,
			{ expiresIn: 60 * 60 }
		);

		res.json({ token });
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;

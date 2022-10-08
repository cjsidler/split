const express = require("express");
const router = require("express").Router();

const { User, createUser, findUsers } = require("../models/user.js");

/*
    Get list of all Users
*/
router.get("/", async (req, res, next) => {
	// Get list of all users
	try {
		const users = await findUsers();
		res.status(200).send(users);
	} catch (err) {
		res.status(500).send(err);
	}
});

/*
    Login Route
*/
router.post("/login", async (req, res, next) => {
	// Save user to db
	try {
		const { username, password } = req.body;

		let newUser;

		if (username && password) {
			// Need to hash pw here & issue JWT back to client

			newUser = await createUser(username, password, "");
			res.status(201).send(newUser);
		} else {
			res.status(400).send({ error: "All fields are required" });
		}
	} catch (err) {
		res.status(500).send(err);
	}

	// res.json({ message: "Youve hit the login route" });
});

module.exports = router;

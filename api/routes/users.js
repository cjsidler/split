const express = require("express");
const router = require("express").Router();

/*
    GET USERS ROUTE
*/
router.get("/", async (req, res, next) => {
	res.json({ message: "This is the users route" });
});

/*
    Login Route
*/
router.post("/login", async (req, res, next) => {
	const body = req.body;
	console.log("BODY:", body);
	res.json({ message: "Youve hit the login route" });
});

module.exports = router;

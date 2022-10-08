const express = require("express");
const router = require("express").Router();

/*
    GET USERS ROUTE
*/
router.get("/", async (req, res, next) => {
	res.json({ message: "This is the users route" });
});

module.exports = router;

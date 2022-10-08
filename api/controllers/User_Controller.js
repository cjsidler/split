const express = require('express');
const router = require('express').Router();

const { User } = require("../Model/User.js");

// Add routes below
router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = router;

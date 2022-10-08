const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Request logger for NodeJs
app.use(morgan("tiny"));
// Parse all requests before handlers. Puts data on req.body
app.use(bodyParser.json());

/*
  CONSTANTS
*/
const PORT = 8080;

app.get("/", (req, res) => {
	res.json({ message: "This is the root route!" });
});

/*
	USERS Middleware
*/
app.use("/users", require("./routes/users"));

// Error middleware
app.use((err, req, res, next) => {
	console.log(
		`Unhandled error ${err}. URL = ${req.originalUrl}, method = ${req.method}`
	);
	res.status.send(`500 - Server Error`);
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});

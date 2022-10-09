require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");
const Client = require("@veryfi/veryfi-sdk");
const sample_ocr_response = require("./uploads/result.json");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const client_id = process.env.VERYFI_CLIENT_ID;
const client_secret = process.env.VERYFI_CLIENT_SECRET;
const username = process.env.VERYFI_USERNAME;
const api_key = process.env.VERYFI_APIKEY;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Request logger for NodeJs
app.use(morgan("tiny"));
// Parse all requests before handlers. Puts data on req.body
app.use(bodyParser.json());

const PORT = 8080;


// USERS Routes
app.use("/users", require("./routes/users"));

// RECEIPTS Routes
app.use("/receipts", require("./routes/receipts"));


//UPLOAD FILES Routes
app.use("/upload_files", require("./routes/upload_files"));

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

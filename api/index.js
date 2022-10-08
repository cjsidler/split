require("dotenv");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");
const Client = require("@veryfi/veryfi-sdk");
const sample_ocr_response = require("./sample_ocr_response.json");
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

/*
    OCR API
*/

// app.post("/upload_files", upload.single("file"), async (req, res) => {
//     const veryfi_client = new Client(client_id, client_secret, username, api_key);
//     try {
//         const data = await veryfi_client.process_document(req.file.path);
//         console.log(data);
//         res.json(data);

//         // Remove temporary file
//         fs.unlink(req.file.path, (err) => {
//             if (err) console.log(err);
//         });
//     } catch (error) {
//         console.log(error);
//         res.json("error calling OCR API");
//     }
// });

app.post("/upload_files", async (req, res) => {
    res.json(sample_ocr_response);
});

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

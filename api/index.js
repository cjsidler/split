require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");
const Client = require("@veryfi/veryfi-sdk");
const sample_ocr_response = require("./sample_ocr_response.json");

const client_id = process.env.VERYFI_CLIENT_ID;
const client_secret = process.env.VERYFI_CLIENT_SECRET;
const username = process.env.VERYFI_USERNAME;
const api_key = process.env.VERYFI_APIKEY;

const app = express();

/*
  CONSTANTS
*/
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
  ROOT ROUTE
*/
app.get("/", (req, res) => {
    res.json({ message: "This is the root route!" });
});

/*
	USERS Middleware
*/
app.use("/users", require("./routes/users"));

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

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

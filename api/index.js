var express = require("express");
var cors = require("cors");
var app = express();

/*
  CONSTANTS
*/
const PORT = 8080;

app.use(cors());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});

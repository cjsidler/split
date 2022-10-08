const express = require("express");
const cors = require("cors");
const app = express();

/*
  CONSTANTS
*/
const PORT = 8080;

app.use(cors());

app.get("/", (req, res) => {
	res.json({ message: "This is the root route!" });
});

/*
	USERS Middleware
*/
app.use("/users", require("./routes/users"));

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});

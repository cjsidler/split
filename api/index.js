const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

/*
  CONSTANTS
*/
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

/*
  ROOT ROUTE
*/
app.get("/", (req, res) => {
	res.json({ message: "This is the root route" });
});

/*
  USER ROUTES
*/
app.use("/users", require("./routes/users"));

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
  
// Insert the article in our MongoDB database
await article.save();

// Find a single blog post
// const firstArticle = await Blog.findOne({});
// console.log(firstArticle);

// app.get("/", (req, res) => {
// 	res.send("Hello World!");
// });

// app.listen(PORT, () => {
// 	console.log(`Example app listening on port ${PORT}`);
// });

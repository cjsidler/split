// const express = require("express");
// const cors = require("cors");
// const app = express();

import mongoose from 'mongoose';
import Blog from './Model/Blog.js';

/*
  CONSTANTS
*/
const PORT = 8080;

mongoose.connect("mongodb+srv://mattlamDB:SaWzAYjznnpjiglH@cluster0.dlleb.mongodb.net/?retryWrites=true&w=majority")

// app.use(cors());

// Create a new blog post object
const article = new Blog({
    title: 'Awesome Post!',
    slug: 'awesome-post',
    published: true,
    content: 'This is the best post ever',
    tags: ['featured', 'announcement'],
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

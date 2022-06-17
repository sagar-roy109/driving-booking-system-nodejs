const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
	fname: String,
	lname: String,
	dob: String,
	age: Number,

	make: String,
	model: String,
	year: Number,
	lc: String,
	pnumber: String


})

const BlogPost = mongoose.model('Blogpost', BlogPostSchema);
module.exports = BlogPost;

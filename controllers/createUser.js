// const BlogPost = require('../models/blogPost.js');
const User = require('../models/User.js');

module.exports = async (req, res) => {

	await User.create(req.body);
	console.log(req.body);
	res.redirect('/');
}


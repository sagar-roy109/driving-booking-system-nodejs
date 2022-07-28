//Craete data
const BlogPost = require('../models/blogPost.js');

module.exports = async (req, res) => {

	await BlogPost.create({...req.body,
		userid: req.session.userId
	});
	console.log(req.body);
	res.redirect('/registration-succcess');
}


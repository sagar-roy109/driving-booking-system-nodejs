
const BlogPost = require('../models/blogPost.js');
module.exports = async (req, res) => {

	const blogposts = await BlogPost.findOne({ lc: req.query.lc });
	console.log(blogposts);
	res.render('g', {
		blogposts
	});
}



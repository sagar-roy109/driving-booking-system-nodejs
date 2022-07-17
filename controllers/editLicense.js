const BlogPost = require('../models/blogPost.js');
module.exports = async (req, res) => {

	const blogposts = await BlogPost.findById(req.params.id);
	res.render('data-edit', {
		blogposts
	});
}

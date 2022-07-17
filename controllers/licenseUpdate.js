const BlogPost = require('../models/blogPost.js');


module.exports = async (req, res) => {
	id = req.params.id;
	await BlogPost.findByIdAndUpdate(id, req.body);
	res.redirect('/update-succcess');

}

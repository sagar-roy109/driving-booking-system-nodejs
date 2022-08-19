
const User = require('../models/User.js');
const BlogPost = require('../models/blogPost.js');
const ObjectId = require('mongodb').ObjectID;




module.exports = async (req, res) => {

	const last_segment = req.url.split('/').pop();
	const sss = await BlogPost.findOne({userid: ObjectId(last_segment )});

	console.log(sss);

	res.render('user-details');
}




const BlogPost = require('../models/blogPost.js');
const User = require('../models/User.js');
const ObjectId = require('mongodb').ObjectID;

module.exports = async (req, res) => {

	let user =	await User.findOne({_id: ObjectId(req.session.userId)});
	const sss = await BlogPost.findOne({userid: ObjectId(req.session.userId )});


		console.log(user);
		console.log(sss);
		if(sss != null){
			res.render('result',{user, sss});
		} else{
			res.redirect('/g2_test');
		}

}


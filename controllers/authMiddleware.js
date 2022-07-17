const BlogPost = require('../models/blogPost.js');

module.exports = (req,res,next) =>{
	BlogPost.findById(req,session,userId,(error, user)=>{
		if(error || !user){
			return res.redirect('/dashboard');
		}else{
			next();
		}
	})
}

const bcrypt = require('bcrypt');
const path = require('path');
const BlogPost = require('../models/blogPost.js');

module.exports = (req,res) =>{
	const {username,password } = req.body
	BlogPost.findOne({username: username},(error,user)=>{
		if(user){
			bcrypt.compare(password,user.password,(error,same)=>{
					if(same){
						req.session.userId = user._id;
						res.redirect('/dashboard');
					}else{
						res.redirect('/login')
					}
			})
		}else{
			res.redirect('/login');
		}
	})
}

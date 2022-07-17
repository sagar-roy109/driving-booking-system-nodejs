const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const BlogPostSchema = new Schema({
	fname: {
		type: String,
		default: 'default'
	},
	lname: {
		type: String,
		default: 'default'
	},
	dob: {
		type: String,
		default: 0
	},
	age: {
		type: Number,
		default: 0
	},
	username: String,
	password: String,
	user_type: String,
	make: {
		type: String,
		default: 'default'
	},
	model: {
		type: String,
		default: 'default'
	},
	year: {
		type: Number,
		default: 0
	},
	lc: {
		type: String,
		default: 'default'
	},
	pnumber: {
		type: String,
		default: 'default'
	},


})
//encrypt license
BlogPostSchema.pre('save',function(next){
	const newLc = this;
	bcrypt.hash(this.lc, 10,(error, hash)=>{
		this.lc = hash;
		next();
	});



})

//encrypt  driver type
BlogPostSchema.pre('save',function(next){

	bcrypt.hash(this.password, 10,(error, hash)=>{
		this.password = hash;
		next();
	});


})

const BlogPost = mongoose.model('Blogpost', BlogPostSchema);
module.exports = BlogPost;

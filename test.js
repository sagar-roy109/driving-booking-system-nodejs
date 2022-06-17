const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
mongoose.connect('mongodb://localhost/my_database',{useNewUrlParser: true});

BlogPost.create({
	tite: 'Test',
	body: 'Test body'

},(error, blogpost) =>{
	console.log(error,blogpost)
})

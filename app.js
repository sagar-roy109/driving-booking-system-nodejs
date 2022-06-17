// adding required items

const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const BlogPost = require('./models/blogPost.js');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });


//Middleware
const app = new express();
app.use(express.static('secret'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());


//API
app.get('/', (req, res) => {
	// res.sendFile(path.resolve(__dirname,'view/index.html'));
	res.render('index');
});


app.get('/g_test', async (req, res) => {

	res.render('g');
});





app.get('/g2_test', (req, res) => {
	res.render('g2');
});
app.get('/dashboard', (req, res) => {
	res.render('dashboard');
});
app.get('/login', (req, res) => {
	res.render('login');
});
app.get('/registration-succcess', (req, res) => {
	res.render('registration-done');
});
app.get('/update-succcess', (req, res) => {
	res.render('registration-done');
});

//Craete data

app.post('/data/create', async (req, res) => {

	await BlogPost.create(req.body);
	console.log(req.body);
	res.redirect('/registration-succcess');
});


//READ DATA

app.get('/data/show', async (req, res) => {

	const blogposts = await BlogPost.findOne({ lc: req.query.lc });
	console.log(blogposts);
	res.render('g', {
		blogposts
	});
});

app.get('/data/show/:id', async (req, res) => {

	const blogposts = await BlogPost.findById(req.params.id);
	res.render('data-edit', {
		blogposts
	});
});

// Update Data

app.post('/data/update/:id', async (req, res) => {
	id = req.params.id;
	await BlogPost.findByIdAndUpdate(id, req.body);
	res.redirect('/update-succcess');

});











//Listening to the port
app.listen(3000, () => {
	console.log('server is up and running at port 3000.');
});



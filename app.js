// adding required items

const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const BlogPost = require('./models/blogPost.js');
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true });


//Middleware
const app = new express();
const exptressSession = require('express-session');


app.use(express.static('secret'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(exptressSession({
	secret: 'keyboard cat'
}));
global.loggedIn = null;
app.use("*", (req,res,next)=>{
	loggedIn = req.session.userId;
	next();
})


//API
app.get('/', (req, res) => {
	res.render('index');
});


app.get('/g_test', async (req, res) => {
	if(req.session.userId){
		res.render('g');
	}else{
		res.redirect('/login');
	}

});


app.get('/g2_test', (req, res) => {
	if(req.session.userId){
		res.render('g2');
	}else{
		res.redirect('/login');
	}

});
app.get('/dashboard', (req, res) => {
	if(req.session.userId){
		res.render('dashboard');
	}else{
		res.redirect('/login');
	}

});
app.get('/login', (req, res) => {
	res.render('login');
});







// license Registration
const licenseregistration = require('./controllers/registration-done')
app.get('/registration-succcess', licenseregistration);

// license create
const createLicense = require('./controllers/createLicense');
app.post('/data/create', createLicense);

//license update
const licenseUpdate = require('./controllers/licenseUpdate');
app.get('/registration-succcess', licenseUpdate);
app.post('/data/update/:id', licenseUpdate);

//READ License
const readLicense = require('./controllers/readLicense');
app.get('/data/show', readLicense);

//edit License
const editLicense = require('./controllers/editLicense');
app.get('/data/show/:id', editLicense);






//Craete user
const createUser = require('./controllers/createUser');
app.post('/data/Usercreate',createUser);

//login
const login = require('./controllers/login');
app.post('/data/login',login);

//logout
const logout = require('./controllers/logout');
app.get('/logout', logout);

app.get ('/update-succcess', (req, res) => {
	res.render('registration-done');
});







//Listening to the port
app.listen(3000, () => {
	console.log('server is up and running at port 3000.');
});



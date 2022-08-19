// adding required items

const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const BlogPost = require('./models/blogPost.js');
const User = require('./models/User.js');
const Appointment = require('./models/Appointment.js');
const ObjectId = require('mongodb').ObjectID;

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
global.user_type =null

// ass-4 check user type
app.use("*", async (req,res,next)=>{
	loggedIn = req.session.userId;
	if(loggedIn){
		 user_type = await User.findById({_id: ObjectId(req.session.userId)});

	}

	next();
})


//API
app.get('/', (req, res) => {
	res.render('index');
});

// ass-4 send data to g page
app.get('/g_test', async (req, res) => {
	if(req.session.userId){
		const information = await BlogPost.findOne({userid: ObjectId(req.session.userId)});
		console.log(information);
		if (information == null){
			res.redirect('/g2_test');
		}else {
			res.render('g',{
				information
			});
		}

	} else{
		res.redirect('/login');
	}

});

// ass-4 send data to g2 page
app.get('/g2_test', async (req, res) => {
	if(req.session.userId){
		const information = await BlogPost.findOne({userid: ObjectId(req.session.userId)});
		let dd = new Date().toISOString().slice(0, 10);
		const slots = await Appointment.find({date: dd});
		console.log(new Date());
		res.render('g2',{
			information,
			slots,
			dd
		});
	}else{
		res.redirect('/login');
	}

});
//ass-4 appointment view
app.get('/appointment', async (req, res) => {
	if(req.session.userId){
		if(user_type.user_type == 'admin'){
			const dateTime = 	await Appointment.find({date: req.body.date});
			res.render('appointment',{dateTime});
		}
	}else{
		res.redirect('/login');
	}

});

app.get('/get-dates', async (req, res) => {
	if(req.session.userId){
		if(user_type.user_type == 'admin'){

			let searchDate = req.query.date;
			let find = await Appointment.find(
					{date: req.query.date});

			res.render('get-dates',{find, searchDate});

		}
	}else{
		res.redirect('/login');
	}

});

app.get('/apt-success', (req, res) => {
	if(req.session.userId){
		if(user_type.user_type == 'admin'){
			res.render('apt-success');
		}
	}else{
		res.redirect('/login');
	}

});

app.get('/apt-failed', (req, res) => {
	if(req.session.userId){
		if(user_type.user_type == 'admin'){
			res.render('apt-failed');
		}
	}else{
		res.redirect('/login');
	}

});
app.get('/booking-success', (req, res) => {
	if(req.session.userId){
		if(user_type.user_type == 'driver'){
			res.render('bookApt');
		}
	}else{
		res.redirect('/login');
	}

});


// examiner

app.get('/examiner', (req, res) => {
	if(req.session.userId){
		if(user_type.user_type == 'examiner'){
			res.render('examiner');
		}
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
	if(!req.session.userId){
		res.render('login');
	}else{
		res.redirect('/dashboard');
	}

});







// ALL CRUP OPT

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

// ASS-4
// create appointment

const createAppt = require('./controllers/createApt');
app.post('/create-apt', createAppt);


// get appointment
const getApt = require('./controllers/getApt');
app.get('/get-apt', getApt);

const getAptG = require('./controllers/getAptG');
app.get('/get-apt-g', getAptG);

// Book Appointment

const bookApt = require('./controllers/bookApt');
app.post('/book-apt', bookApt);


// Get exam types

const getExamTypes = require('./controllers/getExamTypes');
app.get('/get-exams', getExamTypes);

// get users list

const getUser = require('./controllers/getUser');
app.get('/user-details/:id', getUser);

// update result

const updateResult = require('./controllers/updateResult');
app.post('/result-update', updateResult);

// results show to driver

const result = require('./controllers/result');
app.get('/result', result);

// get student list in admin area

const students = require('./controllers/students');
app.get('/students', students);








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



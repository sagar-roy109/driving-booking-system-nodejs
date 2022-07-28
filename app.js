// adding required items

const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const BlogPost = require('./models/blogPost.js');
const User = require('./models/User.js');
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
		console.log(user_type);
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
		const information = await BlogPost.findOne({userid: ObjectId(req.session.userId)})
		res.render('g2',{
			information
		});
	}else{
		res.redirect('/login');
	}

});
//ass-4 appointment view
app.get('/appointment', (req, res) => {
	if(req.session.userId){
		if(user_type.user_type == 'admin'){
			res.render('appointment');
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



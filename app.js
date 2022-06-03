// adding required items

const express = require('express');
const ejs = require('ejs');

const path = require('path');



//Middleware
const app =  new express ();
app.use(express.static('secret'));
app.set('view engine', 'ejs');


//API
app.get('/',(req,res)=>{
// res.sendFile(path.resolve(__dirname,'view/index.html'));
res.render('index');
});

app.get('/g_test',(req,res)=>{
	res.render('g');
});
app.get('/g2_test',(req,res)=>{
	res.render('g2');
});
app.get('/dashboard',(req,res)=>{
	res.render('dashboard');
});
app.get('/login',(req,res)=>{
	res.render('login');
});











//Listening to the port
 app.listen(3000,()=>{
	 console.log('server is up and running at port 3000.');
 });



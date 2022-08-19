
// Book Appointment
const Appointment = require('../models/Appointment.js');
const User = require('../models/User.js');

module.exports = async (req, res) => {

	// let date;

	// if(!date){
	// 	date = new Date().toISOString().slice(0, 10);
	// }

	// console.log(req.body , req.body.time );
	// await Appointment.findOneAndUpdate({date: req.body.sdate, time:req.body.time}, {available: false, userid: req.session.userId, testType: req.body.test});
	let test =	await User.find({testType: req.query.testType});

		res.render('driver-list' ,{test});
}


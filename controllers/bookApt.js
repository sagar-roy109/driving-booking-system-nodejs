
// Book Appointment
const Appointment = require('../models/Appointment.js');

module.exports = async (req, res) => {

	let date;

	if(!date){
		date = new Date().toISOString().slice(0, 10);
	}

	await Appointment.findOneAndUpdate({date: date, time:req.body.time}, {available: false});

		res.redirect('/booking-success');
}


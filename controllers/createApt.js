//Craete data

const Appointment = require('../models/Appointment.js');

module.exports = async (req, res) => {

	const getDate = await Appointment.find({ date: req.body.date });
	await Appointment.create(req.body);

		res.redirect('/apt-success');
}


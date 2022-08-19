
// Book Appointment
const Appointment = require('../models/Appointment.js');

module.exports = async (req, res) => {



	let dd = req.query.s_date;

	const slots = await Appointment.find({date: dd});


		res.render('get-apt-date',{
			slots, dd
		});
}


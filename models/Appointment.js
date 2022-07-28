const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppintmentSchema = new Schema({
	date: String,
	time: String,
	userid:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	available: {
		type:	Boolean,
		default : false
	}
})


const Appointment = mongoose.model('Appointment', AppintmentSchema);
module.exports = Appointment;

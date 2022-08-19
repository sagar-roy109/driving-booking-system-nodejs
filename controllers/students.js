

const User = require('../models/User.js');

module.exports = async (req, res) => {
	let test =	await User.find({result: req.query.result});
		console.log(req.query.result);
		res.render('students' ,{test});
}


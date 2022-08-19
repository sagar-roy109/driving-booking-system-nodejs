

const User = require('../models/User.js');
const ObjectId = require('mongodb').ObjectID;

module.exports = async (req, res) => {

	let user =	await User.findByIdAndUpdate({_id: ObjectId(req.body.id)},{comment: req.body.comments, result: req.body.result});

		res.render('examiner');
}


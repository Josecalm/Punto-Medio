'user strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = Schema({
	name: String,
	category: String,
	description: String,
	launchDate: Date,
	adminRating: Number,
	image: String,
	userRating: Number
});

module.exports = mongoose.model('Item', ItemSchema);

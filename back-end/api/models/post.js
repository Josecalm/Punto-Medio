'user strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = Schema({
	title: String,
	subtitle: String,
	body: String,
	image: String,
	author: { type: Schema.ObjectId, ref:'User'},
	date: Date,
	genre: String, 
	director: String,
	item: {type: Schema.ObjectId, ref:'Item'}
});

module.exports = mongoose.model('Post', PostSchema);

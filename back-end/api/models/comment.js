'user strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = Schema({
	date: Date,
	user: { type: Schema.ObjectId, ref:'User'},
	post: { type: Schema.ObjectId, ref:'Post'},
	body: String
});

module.exports = mongoose.model('Commet', CommentSchema);

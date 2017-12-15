'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_pm';

exports.createToken = function(user) {
	var payLoad = {
		sub: user._id,
		name: user.name,
		username: user.username,
		email: user.email,
		role: user.role, 
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};

	return jwt.encode(payLoad, secret);
};
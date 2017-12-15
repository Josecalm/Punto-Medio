'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, res){
	res.status(200).send({
		message: 'Probando una acción del controlador de usuario del API con Node y Mongoose'
	});
}

function saveUser(req, res){
	var user = new User();

	var params = req.body;

	console.log(params);

	user.name = params.name;
	user.username =params.username;
	user.email = params.email;
	user.role = 'ROLE_USER';

	if(params.password){
		//Encriptación de la contrasñea
		bcrypt.hash(params.password, null, null, function(err, hash){
			user.password = hash;
			if(user.name != null && user.username != null && user.email != null){
				user.save((err, userStored) => {
					if(err){
						res.status(500).send({message: 'Error al guardar el usuario'});

					}else{
						if(!userStored){
							res.status(404).send({message: 'No se pudo registrar el usuario'});
						}else{
							res.status(200).send({user: userStored});
						}
					}
				});
			}else{
				res.status(200).send({message: 'Todos los campos son obligatorios'});
			}
		});
	}else{
		res.status(200).send({message: 'Introduce la contrasñea'});
	}
}

function loginUser(req, res){
	var params = req.body;

	var username = params.username;
	var password = params.password;

	User.findOne({username: username.toLowerCase()}, (err, user) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe'});
			}else{
				bcrypt.compare(password, user.password, function(err, check){
					if(check){
						//Devolver los datos del usuario logeado
						if(params.gethash){
							//Devolver un token de JWT
							res.status(200).send({
								token: jwt.createToken(user)
							});
						}else{
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message: 'El usuario no se ha podido logear'});
					}
				});
			}
		}
	});
}

function updateUser(req, res){
	var userId = req.params.id;
	var update = req.body;

	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});	
		}else{
			if(!userUpdated){
			res.status(404).send({message: 'No se ha podido actulizar el usuario'});	
			}else{
				res.status(200).send({user: userUpdated});	
			}
		}
		
	});
};

module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser
};
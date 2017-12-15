'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-Pagination');
var Item = require('../models/item');
var Post = require('../models/post');
var Comment = require('../models/comment');


function getPost(req, res){
	var postId = req.params.id;

	Post.findById(postId).populate({path: 'item'}).exec((err, post)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!post){
				res.status(404).send({message: 'Este item no existe'});
			}else{
				res.status(200).send({post});
			}
		}
	});
};

function getPosts(req, res){
	var itemId = req.params.item;

	if(!itemId){
		//Se sacan todos los posts de la BBDD
		var find = Post.find({}).sort('date');
	}else{
		//Se sacan los posts de este item en específico de la BD
		var find = Post.find({item: itemId}).sort('date');
	}

	find.populate({path: 'item'}).exec((err, posts) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!posts){
				res.status(404).send({message: 'No hay posts'});
			}else{
				res.status(200).send({posts});
			}
		}
	});
}

function savePost(req, res){
	var post = new Post();

	var parms = req.body;
	post.title = parms.title;
	post.subtitle = parms.subtitle;
	post.body = parms.body;
	post.author = parms.author;
	post.date = parms.date;
	post.genre = parms.genre;
	post.item = parms.item;

	post.save((err, itemStored) => {
		if(err){
			res.status(500).send({message: 'Error al guardar el post'});
		}else{
			if(!itemStored){
				res.status(404).send({message: 'El post no ha sido guardado'});
			}else{
				res.status(200).send({post: itemStored});
			}	
		}
		
	});
}

function updatePost(req, res){
	var postId = req.params.id;
	var update = req.body;

	Post.findByIdAndUpdate(postId, update, (err, postUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el post'});	
		}else{
			if(!postUpdated){
				res.status(404).send({message: 'No se ha podido actulizar el post'});	
			}else{
				res.status(200).send({post: postUpdated});	
			}
		}
		
	});
};

function deletePost(req, res){
	var postId = req.params.id;

	//Si se elimina un post,  se eliminará en cascada todos los comentarios pertenecientes al mismo
	Post.findByIdAndRemove(postId ,(err, postRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar esta post'});	
		}else{
			if(!postRemoved){
			res.status(404).send({message: 'No se ha podido eliminar el post'});	
			}else{
				Comment.find({post: postRemoved._id}).remove((err, commentRemoved) =>{
					if(err){
						res.status(500).send({message: 'Error al eliminar este comentario'});	
					}else{
						if(!commentRemoved){
							res.status(404).send({message: 'No se ha podido eliminar el comentario'});	
						}else{
							res.status(200).send({post: postRemoved});
						}
					}
				});

			}
		}
	});
}

function uploadImage(req, res){
	var postId = req.params.id;
	var file_name = 'No se ha subido una imagen...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg'){
			Post.findByIdAndUpdate(postId, {image: file_name}, (err, postUpdated) => {
				if(!postUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el item'});
				}else{
					res.status(200).send({post: postUpdated});
				}
			});
		}else{
			res.status(200).send({message: 'Extensión de imagen no válida'});
		}
	}else{
		res.status(200).send({message: 'No se ha subido ninguna imagen >:('});
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file =  './uploads/posts/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen :C'});
		}
	});
}


module.exports = {
	getPost,
	savePost,
	getPosts,
	updatePost,
	deletePost,
	uploadImage,
	getImageFile
};
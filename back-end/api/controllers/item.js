'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-Pagination');
var Item = require('../models/item');
var Post = require('../models/post');
var Comment = require('../models/comment');


function getItem(req, res){
	var itemId = req.params.id;
	Item.findById(itemId, (err, item) => {
		if(err){
			res.status(500).send({messaege: 'Error en la petición'});
		}else{
			if(!item){
				res.status(404).send({messaege: 'Este item no existe :('});
			}else{
				res.status(200).send({item});
			}
		}
	})
};

function getItems(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}
	
	var itemsPerPage = 3;

	Item.find().sort('name').paginate(page, itemsPerPage, function(err, items, total){
		if(err){
			res.status(500).send({messaege: 'Error en la petición :('});
		}else{
			if(!items){
				res.status(404).send({messaege: 'No hay items :('});
			}else{
				return res.status(200).send({
					total_items: total, 
					items: items
				});
			}
		}
	});
}

function saveItem(req, res){
	var item = new Item();

	var parms = req.body;
	item.name = parms.name;
	item.category = parms.category;
	item.description = parms.description;
	item.launchDate = parms.launchDate;
	item.adminRating = parms.adminRating;
	item.userRating = parms.userRating;

	item.save((err, itemStored) => {
		if(err){
			res.status(500).send({message: 'Error al guardar el item'});
		}else{
			if(!itemStored){
				res.status(404).send({message: 'El item no ha sido guardado'});
			}else{
				res.status(200).send({item: itemStored});
			}	
		}
		
	});
}

function updateItem(req, res){
	var itemId = req.params.id;
	var update = req.body;

	Item.findByIdAndUpdate(itemId, update, (err, itemUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el item'});	
		}else{
			if(!itemUpdated){
			res.status(404).send({message: 'No se ha podido actulizar el item'});	
			}else{
				res.status(200).send({item: itemUpdated});	
			}
		}
		
	});
};

function deleteItem(req, res){
	var itemId = req.params.id;

	//Si se elimina un post,  se eliminará en cascada todos los post y los comentarios de los posts
	Item.findByIdAndRemove(itemId,  (err, itemRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar el item'});	
		}else{
			if(!itemRemoved){
			res.status(404).send({message: 'No se ha podido eliminar el item'});	
			}else{
				Post.find({item: itemRemoved._id}).remove((err, postRemoved) =>{
					if(err){
						res.status(500).send({message: 'Error al eliminar este post'});	
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
										res.status(200).send({item: itemRemoved});
									}
								}
							});

						}
					}
				});
			}
		}
		
	});
}

function uploadImage(req, res){
	var itemId = req.params.id;
	var file_name = 'No se ha subido una imagen...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg'){
			Item.findByIdAndUpdate(itemId, {image: file_name}, (err, itemUpdated) => {
				if(!itemUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el item'});
				}else{
					res.status(200).send({item: itemUpdated});
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
	var path_file =  './uploads/items/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen :C'});
		}
	});
}


module.exports = {
	getItem,
	saveItem,
	getItems,
	updateItem,
	deleteItem,
	uploadImage,
	getImageFile
}
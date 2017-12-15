'use strict'

var express = require('express');
var ItemController = require('../controllers/item');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/items' });

api.get('/item/:id', md_auth.ensureAuth, ItemController.getItem);
api.get('/items/:page?', md_auth.ensureAuth, ItemController.getItems);
api.post('/item', md_auth.ensureAuth, ItemController.saveItem);
api.put('/item/:id', md_auth.ensureAuth, ItemController.updateItem);
api.delete('/item/:id', md_auth.ensureAuth, ItemController.deleteItem);
api.post('/upload-image-item/:id', [md_auth.ensureAuth, md_upload], ItemController.uploadImage);
api.get('/get-image-item/:imageFile',  ItemController.getImageFile);

module.exports = api;
'use strict'

var express = require('express');
var PostController = require('../controllers/post');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/posts' });

api.get('/post/:id', md_auth.ensureAuth, PostController.getPost);
api.post('/post', md_auth.ensureAuth, PostController.savePost);
api.get('/posts/:item?', md_auth.ensureAuth, PostController.getPosts);
api.put('/post/:id', md_auth.ensureAuth, PostController.updatePost);
api.delete('/post/:id', md_auth.ensureAuth, PostController.deletePost);
api.post('/upload-image-post/:id', [md_auth.ensureAuth, md_upload], PostController.uploadImage);
api.get('/get-image-post/:imageFile',  PostController.getImageFile);



module.exports = api;
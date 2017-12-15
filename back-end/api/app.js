'user strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar rutas
var user_routes = require('./routes/user');
var item_routes = require('./routes/item');
var post_routes = require('./routes/post');

//
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras http
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTION, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTION, PUT, DELETE');

	next();
});

//Rutas base
app.use('/api', user_routes);
app.use('/api', item_routes);
app.use('/api', post_routes);

module.exports = app;

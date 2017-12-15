'user strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/punto-medio', (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("La conexión a la BD se está ejecutando correctamente");
		app.listen(port, function(){
			console.log("Servidor de API REST de Punto-Medio escuchando en http://localhost:"+port);
		})
	}
});


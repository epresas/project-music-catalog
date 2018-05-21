'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

//CONEXIÓN A BD

mongoose.Promise = global.Promise; // elimina el aviso de mongoose Promise por consola.
mongoose.connect("mongodb://epresas:epresas84Admin@ds117070.mlab.com:17070/proyecto_mean", ( err, res ) => {
    if ( err ) {
        throw ( err );
    }
    else {
        console.log( "Conexión a BD exitosa." );
        app.listen(port, () =>{
            console.log("API cargada correctamente y escuchando.");
        })
    }
});
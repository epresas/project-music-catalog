'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'edmundify';

//la funcion ensureAuth necesita un parámetro extra "next" para salir del middleware y pasar a la acción del controlador

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message: 'La petición no posee cabecera de autenticación'});
    }
    //el header puede venir con comillas simples o dobles, por lo que con el metodo replace se eliminan con una exp. regular y se almacena el token.
    var token = req.headers.authorization.replace(/['"]+/g, '');
    //se hace try/catch para filtrar tokens no válidos
    try{
        //decodificación del payload para luego comparar fecha de expiracion con la fecha actual y determinar si el token es válido.
        var payload= jwt.decode(token,secret);
        if (payload.exp <= moment().unix()) {
            
            return res.status(403).send({message: 'El token ya ha expirado.'});

        }

    }catch(ex){
        console.log(ex);
        return res.status(403).send({message: 'Token inválido.'});

    }

    // Se agrega un objeto user al request con el payload.
    req.user = payload;

    //salimos del middleware.
    next();
};
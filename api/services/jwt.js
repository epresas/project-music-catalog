'use strict'

var  jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'edmundify';

exports.createToken = function (user) {
    //Variable payload con la informacion del usuario pasada por parámetro.
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), // fecha de creación en formato unix (timestamp)
        exp: moment().add(30, 'days').unix() //fecha de expiración del token
    }
    //La librería jwt codificará el payload utilizando la clave secret.
    return jwt.encode(payload, secret);
}
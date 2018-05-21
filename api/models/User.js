'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});

// exportación del modelo, para instanciarlo con el tipo UserSchema.
module.exports = mongoose.model('User', UserSchema);
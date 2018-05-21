'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});

// exportación del modelo, para instanciarlo con el tipo ArtistSchema.
module.exports = mongoose.model('Artist', ArtistSchema);
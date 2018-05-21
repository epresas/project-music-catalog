'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: { type: Schema.ObjectId, ref: 'Artist' }
});

// exportación del modelo, para instanciarlo con el tipo AlbumSchema.
module.exports = mongoose.model('Album', AlbumSchema);
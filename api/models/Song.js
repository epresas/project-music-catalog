'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = Schema({
    number: String,
    name: String,
    file: String,
    album: { type: Schema.ObjectId, ref: 'Album'}
});

// exportación del modelo, para instanciarlo con el tipo SongSchema.
module.exports = mongoose.model( 'Song', SongSchema );
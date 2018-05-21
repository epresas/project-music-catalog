'use strict'

var express = require('express');
var ArtistController = require('../controllers/artist');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir:'uploads/artists'});

api.get('/artist/:id', md_auth.ensureAuth, ArtistController.getArtist );
api.get('/artists/:page?', md_auth.ensureAuth, ArtistController.getArtists );
api.post('/artist', md_auth.ensureAuth, ArtistController.createArtist );
api.put('/artist/:id', md_auth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/:id', md_auth.ensureAuth, ArtistController.deleteArtist);

api.post('/artist-upload-image/:id', [md_auth.ensureAuth, md_upload], ArtistController.uploadImage);
api.get('/artist-get-image/:imageFile', ArtistController.getImageFile);



module.exports = api;

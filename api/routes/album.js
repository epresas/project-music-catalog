'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multiparty = require('connect-multiparty');
var md_upload = multiparty({
    uploadDir: 'uploads/artists'
});

api.get('/album/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.get('/albums/:artist?', md_auth.ensureAuth, AlbumController.getAlbums);
api.post('/album', md_auth.ensureAuth, AlbumController.createAlbum);
api.put('/album/:id', md_auth.ensureAuth, AlbumController.updateAlbum);
api.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);

api.post('/album-upload-image/:id', [md_auth.ensureAuth, md_upload], AlbumController.uploadImage);
api.get('/album-get-image/:imageFile', AlbumController.getImageFile);



module.exports = api;

'use strict'

var express = require('express');
var SongController = require('../controllers/song');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multiparty = require('connect-multiparty');
var md_upload = multiparty({
    uploadDir: 'uploads/songs'
});

api.get('/song/:id', md_auth.ensureAuth, SongController.getSong);
api.get('/songs/:album?', md_auth.ensureAuth, SongController.getSongs);
api.post('/song', md_auth.ensureAuth, SongController.createSong);
api.put('/song/:id', md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth, SongController.deleteSong);

api.post('/song-upload-song/:id', [md_auth.ensureAuth, md_upload], SongController.uploadSong);
api.get('/song-get-song/:songFile', SongController.getSongFile);



module.exports = api;

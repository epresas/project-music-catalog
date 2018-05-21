'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var  api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multiparty = require('connect-multiparty');
var md_upload = multiparty({uploadDir:'uploads/users'});

api.get('/test', [md_auth.ensureAuth], UserController.pruebas);
api.get('/user', UserController.getUsers);
api.post('/user', UserController.saveUser);
api.post('/login', UserController.login);
api.put('/user/:id', [md_auth.ensureAuth], UserController.updateUser);
api.delete('/user/:id', [md_auth.ensureAuth], UserController.deleteUser);
api.post('/user-upload-avatar/:id', [md_auth.ensureAuth, md_upload], UserController.uploadAvatar);
api.get('/user-get-avatar/:avatarFile', UserController.getAvatarFile);

module.exports = api;
'use strict'


var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/Artist');
var Album = require('../models/Album');
var Song = require('../models/Song');

function createAlbum(req, res) {
    var album = new Album();

    var params = req.body;

    album.name = params.name;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null',
    album.artist = params.artist;

    album.save((err, album) => {
        if (err) {
            res.status(500).send({
                "message": err.message
            });
        } else {
            if (!album) {
                res.status(404).send({
                    "message": err.message
                });

            } else {

                res.status(200).send(album);
            }

        }
    });
}

function getAlbum(req, res) {
    var albumId = req.params.id;

    Album.findById(albumId).populate({path: 'artist'}).exec((err, album) => {
        if (err) {
            res.status(500).send({
                "message": err.message
            });
        } else {
            if (!album) {

                res.status(404).send({
                    message: "El album no existe."
                });

            } else {
                res.status(200).send({album});
            }
        }
    });

}

function getAlbums(req, res) {

    //se obtienen y ordenan los albums
    var artistId = req.params.artist;

    if (!artistId) {
        var find = Album.find({}).sort('title');
    } else {
        
        var find = Album.find({artist: artistId}).sort('year');
    }

    find.populate({path:'artist'}).exec((err,albums)=>{
      if (err) {
          res.status(500).send({
              "message": err.message
          });
      } else {
          if (!albums) {

              res.status(404).send({
                  message: "No hay albums."
              });

          } else {
              return res.status(200).send(albums);
          }
      }
    });
    
}

function updateAlbum(req, res) {
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, updatedAlbum) => {
        if (err) {
            res.status(500).send({
                "message": err.message
            });
        } else {
            if (!updatedAlbum) {
                res.status(404).send({
                    "message": err.message
                });

            } else {

                res.status(200).send(updatedAlbum);
            }

        }
    });
}

function deleteAlbum(){

    var albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, removedAlbum)=>{//Encontrar albums relacionados con el id del artista

        if (err) {
            res.status(500).send({"message": err.message});
        } else {
            if (!removedAlbum) {
                res.status(404).send({"message": err.message});

            } else {
                Song.find({album: removedAlbum._id}).remove((err, removedSong) => {

                    if (err) {
                        res.status(500).send({"message": err.message});
                    } else {
                        if (!removedSong) {
                            res.status(404).send({"message": err.message});

                        } else {
                            res.status(200).send({artist: removedArtist});

                        }
                    }

                }); //Song.find
                
            }
        }

    });//Album.find
    

}

function uploadImage(req, res) {
    var albumId = req.params.id
    var fileName = "vacío...";


    if (req.files) {
        var filePath = req.files.image.path;
        var fileSplited = filePath.split('\\');
        var fileName = fileSplited[2];

        //sacar la extensión de la imagen
        var fileNameSplited = fileName.split('\.');
        var fileExtension = fileNameSplited[1];

        //comprobar que sea una imagen jpg, png o gif

        if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'gif') {
            Album.findByIdAndUpdate(albumId, {image: fileName}, (err, updatedAlbum) => {
                if (!updatedAlbum) {
                    res.status(400).send({message: 'No se ha podido actualizar.'})
                } else {
                    res.status(200).send({album: updatedAlbum})

                }
            })
        } else {
            res.status(200).send({
                message: 'Extensión del archivo no válida.'
            })
        }
        console.log(fileExtension);
    } else {

        res.status(200).send({
            message: 'No se ha subido la imagen.'
        });
    }

}

function getImageFile(req, res) {
    var imageFile = req.params.imageFile;

    //método que comprueba que existe la imagen para luego devolverla
    fs.exists('./uploads/albums/' + imageFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve('./uploads/albums/' + imageFile));
        } else {
            res.status(200).send({
                message: 'No existe la imagen.'
            })
        }
    });
}


module.exports = {
    createAlbum,
    getAlbum,
    getAlbums,
    getImageFile,
    updateAlbum,
    uploadImage,
    deleteAlbum
}
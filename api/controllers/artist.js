'use strict'


var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/Artist');
var Album = require('../models/Album');
var Song = require('../models/Song');

function getArtist(req,res) {
    var artistId = req.params.id;
    Artist.findById(artistId, (err, artist)=>{
        if (err) {
            res.status(500).send({"message": err.message});  
        } else {
            if (!artist) {

                res.status(404).send({message: "El artista no existe."});  
                
            } else {
                res.status(200).send(artist);
            }
        }
    });
    
}

function getArtists(req,res) {
//primero nos aseguramos que la pagina pasada por url exista, sino, por defecto sera la primera
    if (req.params.page) {
        
        var page = req.params.page;

    } else {
        var page = 1
    }
    var itemsPage = 4;
//se obtienen y ordenan los artistas
    Artist.find().sort('name').paginate(page, itemsPage, (err, artists, total)=>{
        if (err) {
            res.status(500).send({
                "message": err.message
            });
        } else {
            if (!artists) {

                res.status(404).send({
                    message: "No hay artistas."
                });

            } else {
                return res.status(200).send({
                    page: page,
                    total_items: total,
                    artists: artists
                });
            }
        }
    })
}

function createArtist(req,res) {
    var artist = new Artist();

    var params = req.body;

    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artist)=>{
        if (err) {
            res.status(500).send({"message": err.message});
        } else {
            if (!artist) {
                res.status(500).send({"message": err.message});
                
            } else {
                res.status(200).send(artist);
            }
            
        }
    });
}

function updateArtist(req, res) {
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId,update,(err, updatedArtist)=>{
        if (err) {
            res.status(500).send({"message": err.message});
        } else {
            if (!updatedArtist) {
                res.status(404).send({"message": err.message});
                
            } else {
                
                res.status(200).send(updatedArtist);
            }
            
        }
    });
}

function deleteArtist(req, res) {
    var artistId = req.params.id;
    Artist.findByIdAndRemove(artistId, function (err, removedArtist) {
        if (err) {
            res.status(500).send({
                "message": err.message
            });
        } else {
           

            //Eliminamos tambien todo lo referente al artista

            Album.find({artist: removedArtist._id}).remove((err, removedAlbum)=>{//Encontrar albums relacionados con el id del artista

                if (err) {
                     res.status(500).send({
                         "message": err.message
                     });
                } else {
                    if (!removedAlbum) {
                        res.status(404).send({
                            "message": err.message
                        });

                    } else {
                        Song.find({
                            album: removedAlbum._id
                        }).remove((err, removedSong) => {

                            if (err) {
                                res.status(500).send({
                                    "message": err.message
                                });
                            } else {
                                if (!removedSong) {
                                    res.status(404).send({
                                        "message": err.message
                                    });

                                } else {
                                    res.status(200).send({artist: removedArtist});

                                }
                            }

                        }); //Song.find
                        
                    }
                }

            });//Album.find
        }
    });
}


function uploadImage(req, res) {
    var artistId = req.params.id
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
            Artist.findByIdAndUpdate(artistId, {
                image: fileName
            }, (err, updatedArtist) => {
                if (!updatedArtist) {
                    res.status(400).send({
                        message: 'No se ha podido actualizar.'
                    })
                } else {
                    res.status(200).send({
                        artist: updatedArtist
                    })

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
    fs.exists('./uploads/artists/' + imageFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve('./uploads/artists/' + imageFile));
        } else {
            res.status(200).send({
                message: 'No existe la imagen.'
            })
        }
    });
}

module.exports = {
    getArtist,
    getArtists,
    createArtist,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile

}
'use strict'


var fs = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/Artist');
var Album = require('../models/Album');
var Song = require('../models/Song');


//CRUD
function createSong(req,res){
    var song = new Song();
    var params = req.body;

    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album;

    song.save((err,song)=>{
        if (err) {
            res.status(500).send({"message": err.message});
        } else {
            if (!song) {
                res.status(404).send({"message": err.message});
                
            } else {
                
                res.status(200).send(song);
            }
            
        }
    });

};
function getSong(req,res){
    var songId = req.params.id;

    Song.findById(songId).populate({path: 'album'}).exec((err, song)=>{
       if (err) {
            res.status(500).send({"message": err.message});
        } else {
            if (!song) {
                res.status(404).send({"message": err.message});
                
            } else {
                
                res.status(200).send(song);
            }
            
        } 
    });
};
function getSongs(req,res){

    var albumId = req.params.album;
    if (!albumId) {
        var find = Song.find({}).sort('number');
    } else {
        
        var find = Song.find({album: albumId}).sort('number');
        
    }

    find.populate({
        path: 'album',
        populate:{
            path: 'artist',
            model: 'Artist'
        }
    }).exec((err, songs)=>{
        if (err) {
            res.status(500).send({"message": err.message});
        } else {
            if (!songs) {
                res.status(404).send({"message": err.message});
                
            } else {
                
                res.status(200).send(songs);
            }
            
        } 
    });
};


function updateSong(req,res){

var songId = req.params.id;
var update = req.body;

    Song.findByIdAndUpdate(songId, update, (err, updatedSong) => {
        if (err) {
            res.status(500).send({"message": err.message});
        } else {
            if (!updatedSong) {
                res.status(404).send({"message": err.message});
                
            } else {
                
                res.status(200).send(updatedSong);
            }
            
        }
    });

};
function deleteSong(req,res){
    var songId = req.params.id;
    
    Song.findByIdAndRemove(songId,(err, song)=>{
        if (err) {
            res.status(500).send({"message": err.message});
        } else {
            if (!updatedSong) {
                res.status(404).send({"message": err.message});
                
            } else {
                
                res.status(200).send(song);
            }
            
        }
    });
};

//MANEJO DE ARCHIVO

function uploadSong(req, res) {
    var songId = req.params.id
    var fileName = "vacío...";


    if (req.files) {
        var filePath = req.files.file.path;
        var fileSplited = filePath.split('\\');
        var fileName = fileSplited[2];

        //sacar la extensión de la cancion
        var fileNameSplited = fileName.split('\.');
        var fileExtension = fileNameSplited[1];

        //comprobar que sea una cancion mp3, ogg o wav

        if (fileExtension === 'mp3' || fileExtension === 'ogg' || fileExtension === 'wav') {
            Song.findByIdAndUpdate(songId, {
                file: fileName
            }, (err, updatedSong) => {
                if (!updatedSong) {
                    res.status(400).send({
                        message: 'No se ha podido actualizar.'
                    })
                } else {
                    res.status(200).send({
                        song: updatedSong
                    })

                }
            })
        } else {
            res.status(200).send({
                message: 'Extensión del archivo no válida.'
            })
        }
        // console.log(fileExtension);
    } else {

        res.status(200).send({
            message: 'No se ha subido la imagen.'
        });
    }

}

function getSongFile(req, res) {
    var songFile = req.params.songFile;

    //método que comprueba que existe la cancion para luego devolverla
    fs.exists('./uploads/songs/' + songFile, (exists) => {
        if (exists) {
            res.sendFile(path.resolve('./uploads/songs/' + songFile));
        } else {
            res.status(200).send({
                message: 'No existe la canción.'
            })
        }
    });
}



module.exports = {
    getSong,
    getSongs,
    createSong,
    updateSong,
    deleteSong,
    uploadSong,
    getSongFile

}
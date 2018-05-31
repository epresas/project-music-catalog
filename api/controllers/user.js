'use strict'

var User =  require('../models/User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

function pruebas (req, res){
    res.status(200).send({
        message: 'Probando user ctrl.'
    });
}

function saveUser (req, res){
    var user = new User();


    var params = req.body; // recojo todos los valores del req en una sola variable
    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER'; //temporal, quitar al dinamizar
    user.image = 'null';

    if (params.password) {
        //Encriptación con bcrypt
        bcrypt.hash(params.password, null , null,  (err, hash)=>{
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                user.save((err, userStored)=>{
                    if (err) {
                        res.status(500).send({message: "Error al guardar el usuario."});
                    }else{
                        if (!userStored) {
                            
                            res.status(404).send({ message: "No se ha guardado el usuario." });   

                        }else{
                            res.status(200).send({user:userStored});
                        }
                    }
                })
            
            } else{
                res.status(400).send({ message: "Falta algún campo por rellenar." });   
            }
        });
    } else {
        res.status(400).send({message: "Por favor introduce la contraseña"});
    }

}

function login(req, res){
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user)=>{
        if (err) {
            res.status(500).send({message: "Error en la petición."});
        } else{
            //Comprobar que existe el usuario.
            if (!user) {
                res.status(404).send({message: "Usuario no existente."});
                
            } else {
                //La librería bcrypt comparará el password ingresado con el password del usuario coincidente almacenado en la BD.
                bcrypt.compare(password, user.password, (err, check)=>{
                    if (check) {
                        //Decodificar datos para devolver el token
                        if (params.gethash) {
                            res.status(200).send({
                                token: jwt.createToken(user)//user es el objeto obtenido en el findOne (linea 60)
                            }); 
                        } else {
                            res.status(200).send({user});
                            
                       } 
                    } else {
                        
                        res.status(404).send({message: "No se ha podido loggear."});
                    }
                });
            }
        }
    })
}

function getUsers(req, res){
    User.find({},(err, users)=>{
        if (err) {
            res.status(500).send({message: "Problemas en la búsqueda."});
        } else {
            res.status(200).send(users);
            
        }
    });
}
function updateUser(req, res){
    var userId = req.params.id;
    var updateData = req.body;

    if (userId != req.user.sub) {
        console.log(userId, "id token ", req.user.sub);
        // Comparo si el id del token (middleware) es igual al id del usuario para soltar un mensaje de error y salir de la ejecucion (return), sino sigo el flujo
       return res.status(403).send({message: "Token incorrecto, sin autorización para actualizar."});
        
    }

    User.findByIdAndUpdate(userId, updateData,(err, updatedUser)=>{
        if (err) {
            res.status(500).send({message: 'Error en la actualización'});
        } else{
            if (!updatedUser) {
                res.status(400).send({message:'No se ha podido actualizar.'})
            }else{
                res.status(200).send(updatedUser);
                
            }
        }
    });
}
function deleteUser(req,res){
    var userId = req.params.id;
    User.findByIdAndRemove(userId, function (err, users) {
        if (err) {
            res.status(400).send({
                "message": err.message
            });
        } else {
            res.status(200).send(users);
        }
    });
}

function uploadAvatar(req, res){
    var userId = req.params.id
    var fileName = "nada...";
    
    
    if (req.files) {
        var filePath = req.files.image.path;
        var fileSplited = filePath.split('\\');
        var fileName = fileSplited[2];

        //sacar la extensión de la imagen
        var fileNameSplited = fileName.split('\.');
        var fileExtension = fileNameSplited[1];

        //comprobar que sea una imagen jpg, png o gif

        if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'gif') {
           User.findByIdAndUpdate( userId,{image: fileName }, ( err, updatedUser )=>{
                if (!updatedUser) {
                    res.status(400).send({
                        message: 'No se ha podido actualizar.'
                    })
                } else {
                    res.status(200).send({
                        image:fileName,
                        user: updatedUser
                    })

                }
           }) 
        } else{
            res.status(200).send({
                message: 'Extensión del archivo no válida.'
            })
        }
        console.log(fileExtension);
    }else{
        
        res.status(200).send({message:'No se ha subido la imagen.'});
    }

}

function getAvatarFile(req, res) {
    var avatarFile = req.params.avatarFile;

    //método que comprueba que existe la imagen para luego devolverla
    fs.exists('./uploads/users/' + avatarFile, (exists)=>{
        if (exists) {
            res.sendFile(path.resolve('./uploads/users/' + avatarFile));
        } else {
            res.status(200).send({
                message: 'No existe la imagen.'
            })
        }
    });
}


module.exports = {
    pruebas,
    saveUser,
    login,
    getUsers,
    updateUser,
    deleteUser,
    uploadAvatar,
    getAvatarFile  
};
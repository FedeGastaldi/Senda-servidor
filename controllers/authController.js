const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});
const {validationResult} = require('express-validator');

exports.autenticarUsuario = async (req, res, next) => {

    //REVISAMOS SI HAY ERRORES
    //MOSTRAR MENSAJES DE ERROR DE EXPRESS VALIDATOR
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //BUSCAMOS EL USUARIO PARA VER SI ESTÁ REGISTRADO
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        res.status(401).json({msg: 'El Usuario no existe'});
        return next();
    }

    //VERIFICAR EL PASSWORD Y AUTENTICAR EL USUARIO
    if(bcrypt.compareSync(password, usuario.password)){
        //CREAR JWT
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email

        }, process.env.SECRETA, {
            expiresIn: '8h'
        });

        res.json({token})

    } else {
        res.status(401).json({msg: 'Password incorrecto'});
        return next();
    }
}

exports.usuarioAutenticado = (req, res, next) => {
    
    res.json({usuario: req.usuario});
}
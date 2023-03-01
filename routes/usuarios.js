//ROUTING

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController')
const { check } = require('express-validator');


router.post('/' ,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'La contraseña debe ser de al menos 8 caractéres').isLength({min: 8})
    ],
    //Enlace al controlador
    usuarioController.nuevoUsuario
);


module.exports = router;

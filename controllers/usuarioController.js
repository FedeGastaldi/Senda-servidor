const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');  // ACLARACION: DE ESTA FORMA IMPORTAMOS, CON CONST
const {validationResult} = require('express-validator')

exports.nuevoUsuario = async (req , res) => {

    //MOSTRAR MENSAJES DE ERROR DE EXPRESS VALIDATOR
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    //VERIFICAMOS SI EL USUARIO YA ESTUVO REGISTRADO
    //extraemos el email del body y luego podemos ver si el usuario esta registrado con "findOne"
    const {email , password} = req.body;

    let usuario = await Usuario.findOne({email});

    if(usuario){
        return res.status(400).json({msg: 'El usuario ya está registrado '});
    }


    //CON ESTO CREAMOS UN NUEVO USUARIO
    usuario = new Usuario(req.body);

    //CON ESTO HASHEAMOS EL PASSWORD, ANTES DE GUARDARLO EN LA DB
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);

    try {
        await usuario.save();
        res.json({msg: 'Usuario Creado Correctamente'})

    } catch(error) {
        console.log(error)
    }

    
}
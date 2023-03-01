const Enlaces = require('../models/Enlace');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');


exports.nuevoEnlace = async(req, res, next) => {
    //REVISAMOS SI HAY ERRORES
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }


    //CREAMOS UN OBJETO DE ENLACE
    const {nombre_original} = req.body;

    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = shortid.generate();
    enlace.nombre_original = nombre_original;
    



    //SI EL USUARIO ESTA AUTENTICADO
    if(req.usuario){
        const { password , descargas } = req.body;

        //ASIGNAR A ENLACE EL NUMERO DE DESCARGAS
        if(descargas){
            enlace.descargas = descargas;

        }

        //ASIGNAR UNA CONTRASEÑA
        if(password){
            const salt = await bcrypt.genSalt(10);

            enlace.password = await bcrypt.hash(password, salt);
        }

        //ASIGNAR EL AUTOR
        enlace.autor = req.usuario.id
    }



    //ALMACENAR EN LA DB
    try {
        await enlace.save();
        return res.json({msg : `${enlace.url}`});
        next();
    } catch (error) {
        console.log(error);

    }
}


//OBTENER ENLACES
exports.obtenerEnlace = async (req, res, next) => {

    //console.log(req.params.url);
    const {url} = req.params;

    //VERIFICAMOS SI EXISTE EL ENLACE
    const enlace = await Enlaces.findOne({url});

    if(!enlace){
        res.status(404).json({msg: 'Ese enlace no existe'});
        return next()
    }

    //SI EL ENLACE EXISTE ENTONCES:
    res.json({archivo: enlace.nombre})

    //SI LAS DESCARGAS SON IGUALES A 1 ENTONCES BORRAR ENTRADA Y BORRAR EL ARCHIVO

    const {descargas, nombre} = enlace;
    if(descargas === 1){
        //ELIMINAR ARCHIVO
        req.archivo = nombre;

        //ELIMINAR ENTRADA DE DB
        await Enlaces.findOneAndRemove(req.params.url);


        next();
    } else {
        //SI LAS DESCARGAS SON MAYORES A 1 ENTONCES RESTAR 1
        enlace.descargas--;
        await enlace.save();
        
    }

    




}
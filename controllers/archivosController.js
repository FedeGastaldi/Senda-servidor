const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');




exports.subirArchivo = async(req , res ,next) => {

    const configuracionMulter = {
        limits : {fileSize: req.usuario ? 1024 * 1024 * 10 : 1000000},
        storage : fileStorage = multer.diskStorage({
            destination: (req, res, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}`);
            },
            
        }),
    
    
    }
    
    const upload = multer(configuracionMulter).single('archivo');

    upload(req, res, async(error) => {
        console.log(req.file);
        
        if(!error){
            res.json({archivo: req.file.filename}); // ESTO LE DICE AL USUARIO CUAL ES EL NOMBRE DEL ARCHIVO
        } else {
            console.log(error);
            return next()
        }
    })
    
}


exports.eliminarArchivo = async(req, res ,next) => {

    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`); //METODO PARA ELIMINAR FILE SYSTEM
        console.log('Archivo eliminado');
    } catch (error) {
        console.log(error);
        
    }

}
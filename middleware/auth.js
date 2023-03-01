const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(authHeader){
        //OBTENEMOS EL TOKEN Y LUEGO ACCEDEMOS A EL
        const token = authHeader.split(' ')[1];

        //COMPROBAMOS EL TOKEN
        try {
            const usuario = jwt.verify(token, process.env.SECRETA);
            req.usuario = usuario;
        } catch (error) {
            console.log(error);
            console.log('JWT no valido')
        }
    
    } 


    return next();
}
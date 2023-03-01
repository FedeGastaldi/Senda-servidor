const mongoose = require('mongoose'); 
require('dotenv').config({ path: 'variables.env'}); //CONFIGURAMOS DOTENV



//VAMOS A CREAR UNA FUNCION PARA CONECTAR A LA BASE DE DATOS

const conectarDB = async () => {

    try {  //EN EL TRY VAMOS A TRATAR DE CONECTAR A LA BASE DE DATOS
        await mongoose.connect (process.env.DB_URL, { // UTILIZAMOS EL METODO DE MONGOOSE Y LE PASAMOS LA URL
            useNewUrlParser: true,
            useUnifiedTopology: true
            
        }); 
        console.log('DB Conectada')

        
    } catch (error) {
        console.log('Hubo un error');
        console.log(error);
        process.exit(1);     //CON ESTA LINEA SE DETIENE UNA APP EN NODE, detiene el servidor
        
    }

}

module.exports = conectarDB;


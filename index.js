const express = require('express');
const conectarDB = require('./config/db');



//CREANDO EL SERVIDOR (TODO ES CON "CONST")
const app = express();

//CONECTAR A LA BASE DE DATOS
conectarDB();


//PUERTO DE LA APP
const port = process.env.port || 4000;  // DEFINIMOS EL PUERTO, SI NO HAY NINGUNO ASIGNAMOS EL PUERTO 4000

//HABILITAR LEER LOS VALORES DE UN BODY

app.use(express.json())


//RUTAS DE LA APP
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));


//ARRANCAMO LA APP
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor está funcionando en el puerto ${port}`);
})
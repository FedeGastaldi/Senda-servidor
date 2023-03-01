const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({ // DEFINIMOS LA FORMA QUE VAN A TENER LOS DATOS
    email: {
        type: String,
        required: true,
        unique: true, // no hay mails repetidos
        lowercase: true, // transforma todo el texto en minusculas
        trim: true // elimina espacios
    },
    nombre: {
        type: String,
        required: true,
        trim: true

    },
    password: {
        type: String,
        required: true,
        trim: true

    }
    // SI SE REQUIERE PODEMOS AGREGAR MAS ATRIBUTOS
});

module.exports = mongoose.model('Usuarios', usuariosSchema);
const mongoose = require('mongoose');

const OperacionSchema = mongoose.Schema({
    concepto: {
        type: String,
        required: true,
        trim: true
    },
    monto:{
        type: Number,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    tipo: {
        type: String,
        required: true,
        trim: true
    },
    fecha: {
        type: String
    },
    key:{
        type: String,
        required: true,
        trim: true
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    }

});

module.exports = mongoose.model('Operaciones', OperacionSchema)
const Operation = require('../models/Operation');
const User = require('../models/User');

exports.createOperation = async (req, res) => {

    try {
        // Crear una nueva operacion
        const operacion = new Operation(req.body);
        const usuario = await User.find({ _id: req.usuario.id })
        if (operacion.tipo == "Egreso"){
            saldoNuevo = await usuario[0].saldo - operacion.monto;
        }else{
            saldoNuevo = await usuario[0].saldo + operacion.monto;
        }

        await User.findByIdAndUpdate({_id: req.usuario.id}, { $set : {saldo: saldoNuevo} }, { new: true })

        // Guardar el creador via JWT
        operacion.creador = req.usuario.id;
        // Guardamos la operacion
        operacion.save();
        res.json({operacion});
        
    } catch (error) {
        console.log(error)
        res.status(400).send('Hubo un error');
    }
}

// Obtiene todas las operaciones del usuario actual

exports.getOperation = async (req, res) => {

    try {
        const operaciones = await Operation.find({ creador: req.usuario.id }).sort({ creado: -1});
        res.json({ operaciones });
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}

// Actualizar una operacion

exports.updateOperation = async (req, res) => {

    // Extraer la informacion de la operacion
    const { concept, amount, category, date } = req.body;
    const nuevaOperation = {};

    if (concept){
        nuevaOperation.concept = concept
    }
    if (amount){
        nuevaOperation.amount = amount
    }
    if (categoria){
        nuevaOperation.category = category
    }
    if (date){
        nuevaOperation.fecha = date
    }

    try {
        // Revisar el IDOperation
        let operation = await Operation.findById(req.params.id);

        // Revisar si la operacion existe
        if(!operation){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Verificar el creador de la operacion
        if(operation.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Actualizar
        operation = await Operacion.findByIdAndUpdate({_id: req.params.id}, { $set : nuevaOperation }, { new: true })

        res.json({operation});

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}

// Elimina un proyecto por su ID
exports.deleteOperation = async (req, res) => {

    try {
        // Revisar el ID
        let operation = await Operation.findById(req.params.id);

        // Revisar si la operacion existe
        if(!operation){
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        // Verificar el creador de la operacion
        if(operation.creador.toString() !== req.usuario.id ){
            return res.status(401).json({msg: 'No autorizado'});
        }

        // Eliminar la operacion
        await Operation.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Operacion eliminada' });

    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error');
    }
}
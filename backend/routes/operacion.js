const express = require('express');
const router = express.Router();
const operacionController = require('../controllers/operationController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


// Crea una operacion
// api/operacion

// Crear una operacion
router.post('/',
    auth,
    operacionController.createOperation
)
// Ver todas las operaciones
router.get('/',
    auth,
    operacionController.getOperation
)
// Actualizar una operacion via ID
router.put('/:id', 
    auth,
    operacionController.updateOperation
)

// Elimiar una operacion
router.delete('/:id', 
    auth,
    operacionController.deleteOperation
)

module.exports = router;
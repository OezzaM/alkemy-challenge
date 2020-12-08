const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    // Revisar si hay errores 

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errores: error.array()})
    }

    // extraer email y password

    const { email, password } = req.body;

    try {
        // Revisar que el usuario registrado sea unico
        let user = await User.findOne({ email });
        
        if(user){
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Crea el nuevo usuario
        user = new User(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt)

        // Guarda el usuario
        await user.save();

        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: user.id
            }
        };

        // Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;

            // Mensaje de confirmacion
            res.json({ token });
        });

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}


const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Crear el servidor
const app = express();

// Conectar base de datos
connectDB();

// Habilitar cors
app.use(cors());

// Habilitar express.json

app.use(express.json({ extended: true }))

// Puerto
const PORT = process.env.PORT || 5000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/operacion', require('./routes/operacion'));

// Pagina principal
app.get('/', (req, res) => {
    res.send('CHALLENGE ALKEMY')
})

// Arrancar servidor
app.listen(PORT, () => {
    console.log('El servidor esta funcionando en el puerto:',PORT)
})
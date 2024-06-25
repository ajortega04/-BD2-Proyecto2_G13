const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  genero: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contra: { type: String, required: true },
  nacimiento: { type: String, required: true }
});

const Usuario = mongoose.model('Usuario', usuarioSchema, "usuarios");

module.exports = Usuario;

const mongoose = require('mongoose');
const UsuarioModel = require('../models/Usuario');

class Usuario {
  constructor(nombre, apellido, genero, correo, contra, nacimiento) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.genero = genero;
    this.correo = correo;
    this.contra = contra;
    this.nacimiento = nacimiento;
  }

  static async getAll() {
    try {
      const usuarios = await UsuarioModel.find();
      console.log('Usuarios encontrados:', usuarios); // Para depuración
      return usuarios.map(user => new Usuario(user.nombre, user.apellido, user.genero, user.correo, user.contra, user.nacimiento));
    } catch (err) {
      console.error('Error en getAll:', err); // Para depuración
      throw new Error('Error al obtener todos los usuarios');
    }
  }

  static async create(nombre, apellido, genero, correo, contra, nacimiento) {
    try {
      const newUser = new UsuarioModel({ nombre, apellido, genero, correo, contra, nacimiento });
      const savedUser = await newUser.save();
      return new Usuario(savedUser._id, savedUser.nombre, savedUser.apellido, savedUser.genero, savedUser.correo, savedUser.contra, savedUser.nacimiento);
    } catch (err) {
      throw new Error('Error al crear el usuario');
    }
  }

  static async delete(id_usuario) {
    try {
      await UsuarioModel.findByIdAndDelete(id_usuario);
    } catch (err) {
      throw new Error('Error al eliminar el usuario');
    }
  }

  static async update(id_usuario, nombre, apellido, genero, correo, contra, nacimiento) {
    try {
      const updatedUser = await UsuarioModel.findByIdAndUpdate(id_usuario, { nombre, apellido, genero, correo, contra, nacimiento }, { new: true });
      return new Usuario(updatedUser._id, updatedUser.nombre, updatedUser.apellido, updatedUser.genero, updatedUser.correo, updatedUser.contra, updatedUser.nacimiento);
    } catch (err) {
      throw new Error('Error al actualizar el usuario');
    }
  }

  static async authUser(correo, contra) {
    try {
      const user = await UsuarioModel.findOne({ correo, contra });
      if (user) {
        return new Usuario(user._id, user.nombre, user.apellido, user.genero, user.correo, user.contra, user.nacimiento);
      }
      return null;
    } catch (err) {
      throw new Error('Error al autenticar el usuario');
    }
  }

  static async getUserById(id_usuario) {
    try {
      const user = await UsuarioModel.findById(id_usuario);
      if (user) {
        return new Usuario(user._id, user.nombre, user.apellido, user.genero, user.correo, user.contra, user.nacimiento);
      }
      return null;
    } catch (err) {
      throw new Error('Error al obtener el usuario por ID');
    }
  }
}

module.exports = Usuario;
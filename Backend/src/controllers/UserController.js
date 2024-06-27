const mongoose = require('mongoose');
const UserModel = require("../models/User");

class User {
    constructor(type, name, lastName, birthdate, email, password) {
        this.type = type;
        this.name = name;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.email = email;
        this.password = password;
    }

    static async create(type, name, lastName, birthdate, email, password, profilePicture, paymentMethod) {
        try {
            // Verificar si ya existe un usuario con el mismo correo electrónico
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                throw new Error('El correo electrónico ya existe');
            }
    
            // Crear nuevo usuario
            const newUser = new UserModel({ type, name, lastName, birthdate, email, password, profilePicture, paymentMethod });
            const savedUser = await newUser.save();
            return {
                _id: savedUser._id,
                type: savedUser.type
            };
        } catch (error) {
            console.error('Error al crear el usuario:', error);
            throw new Error(error.message || 'Error al crear el usuario', error.statusCode || 500);
        }
    }

    static async verifyCredentials(email, password) {
        try {
            const user = await UserModel.findOne({ email });

            if (!user) {
                throw new Error('Correo electrónico o contraseña incorrectos');
            }

            if (user.password !== password) {
                throw new Error('Correo electrónico o contraseña incorrectos');
            }

            return {
                _id: user._id,
                type: user.type
            };
        } catch (error) {
            console.error('Error al verificar las credenciales:', error);
            throw new Error('Error al verificar las credenciales');
        }
    }

    static async getUserById(userId) {
        try {
            const user = await UserModel.findById(userId);

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            const userWithoutPassword = user.toObject();
            delete userWithoutPassword.password;

            return userWithoutPassword;
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            throw new Error('Error al obtener el usuario');
        }
    }

    static async updateUser(userId, name, lastName, birthdate, email, paymentMethod, profilePicture) {
        try {
          const user = await UserModel.findById(userId);
      
          if (!user) {
            throw new Error('Usuario no encontrado');
          }
      
          user.name = name || user.name;
          user.lastName = lastName || user.lastName;
          user.birthdate = birthdate || user.birthdate;
          user.email = email || user.email;
          user.paymentMethod = paymentMethod || user.paymentMethod;
      
          if (profilePicture) {
            user.profilePicture = profilePicture;
          }
      
          const updatedUser = await user.save();
      
          const userWithoutPassword = updatedUser.toObject();
          delete userWithoutPassword.password;
      
          return userWithoutPassword;
        } catch (error) {
          console.error('Error al actualizar el usuario:', error);
          throw new Error('Error al actualizar el usuario');
        }
      }


}

module.exports = User;
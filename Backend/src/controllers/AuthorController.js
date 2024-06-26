const mongoose = require('mongoose')
const AuthorModel = require("../models/Author")

class Author {
    constructor(name, biography, picture) {
        this.name = name;
        this.biography = biography;
        this.picture = picture;
    }

    static async create(name, biography, picture){
        try {
            const newAuthor = new AuthorModel({name, biography, picture});
            const savedAuthor = await newAuthor.save();
            return{
                _id: savedAuthor._id
            }
        } catch (error) {
            console.error('Error al crear el autor:', error);
            throw new Error('Error al crear el autor');
        }
    }

    static async getAll(){
        try {
            return await AuthorModel.find();
        } catch (error){
            console.error('Error al obtener autores:', error);
            throw new Error('Error al obtener autores');
        }
    }

    static async deleteById(id) {
        try {
            await AuthorModel.findByIdAndDelete(id);
        } catch (err) {
            throw new Error('Error al eliminar el usuario');
        }
    }
}

module.exports = Author


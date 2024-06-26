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
            throw new Error(error.message || 'Error al crear el autor', error.statusCode || 500);
        }
    }
}

module.exports = Author
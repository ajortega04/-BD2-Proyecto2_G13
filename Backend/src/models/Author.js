const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: { type: String, require: true },
    biography: { type: String, require: true },
    picture: {type: String, require: true}
});

const Author = mongoose.model('Author', authorSchema, "Authors");

module.exports = Author;
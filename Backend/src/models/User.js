const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    type: { type: Number, require: true },
    name: { type: String, require: true },
    lastName: { type: String, require: true },
    birthdate: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true }
});

const User = mongoose.model('User', userSchema, "Users");

module.exports = User;
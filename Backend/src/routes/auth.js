const express = require('express');
const router = express.Router();
const User = require("../controllers/UserController");

router.post('/create', async (req, res, next) => {
    try {
        const { type, name, lastName, birthdate, email, password } = req.body;
        const newUser = await User.create(type, name, lastName, birthdate, email, password);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json("Error al registrar usuario");
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.verifyCredentials(email, password);
        res.json(user);
    } catch (error) {
        next(error);
    }
});

module.exports = router;

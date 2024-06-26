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


module.exports = router;

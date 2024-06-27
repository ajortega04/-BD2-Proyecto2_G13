const express = require('express');
const router = express.Router();
const User = require("../controllers/UserController");
const { uploadFile } = require('../s3');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', upload.single('profilePicture'), async (req, res, next) => {
    try {
        const { type, name, lastName, birthdate, email, password, paymentMethod } = req.body;
        const profilePicture = req.file ? await uploadFile(req.file) : null;
        const newUser = await User.create(type, name, lastName, birthdate, email, password, profilePicture, paymentMethod);
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err);
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

router.get('/:userId', async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const user = await User.getUserById(userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;


router.put('/:userId', upload.single('profilePicture'), async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const { name, lastName, birthdate, email, paymentMethod } = req.body;
      let profilePicture = null;
  
      if (req.file) {
        profilePicture = await uploadFile(req.file);
      }
  
      const updatedUser = await User.updateUser(userId, name, lastName, birthdate, email, paymentMethod, profilePicture);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  });
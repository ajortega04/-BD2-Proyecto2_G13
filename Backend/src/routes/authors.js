const express = require('express');
const router = express.Router();
const {uploadFile} = require('../s3');
const multer = require('multer');
const upload = multer();
const Author = require("../controllers/AuthorController");

router.post('/create', upload.single('picture'), async (req, res) => {
    try{
        const {name, biography} = req.body;
        const result = await uploadFile(req.file);
        const newAuthor = await Author.create(name, biography, result);
        res.status(201).json(newAuthor);
    } catch (err) {
        res.status(500).json("Error al registrar autor");
    }
});

module.exports = router;
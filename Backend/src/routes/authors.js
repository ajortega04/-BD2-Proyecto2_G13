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
        next(err);
    }
});

router.get('/get-all', async (req, res, next) => {
    try {
        const authors = await Author.getAll();
        res.json(authors);
    } catch (err) {
        next(err);
    }
});

router.delete('/delete-by-id/:id', async (req, res, next) => {
    try {
        await Author.deleteById(req.params.id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.get('/get-by-id/:id', async (req, res, next) => {
    try {
        const author = await Author.getById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        res.json(author);
    } catch (err) {
        next(err);
    }
});



router.put('/update/:id', upload.single('picture'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, biography } = req.body;
        let picture = req.body.picture;
        if (req.file) {
            const result = await uploadFile(req.file);
            picture = result;
        }
        const updatedAuthor = await Author.update(id, name, biography, picture);
        res.json(updatedAuthor);
    } catch (err) {
        next(err);
    }
});



module.exports = router;
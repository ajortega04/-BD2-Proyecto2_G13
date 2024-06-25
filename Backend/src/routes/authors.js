const express = require('express');
const router = express.Router();
const {uploadFile} = require('../s3');
const multer = require('multer');
const upload = multer();

router.post('/author/create', upload.single('picture'), async (req, res) => {
    return res.status(201).json({msg: "Artist created"});
});

router.get('/author/get-all', (req, res) => {
    res.status(200).json("retriving all artists");
});

module.exports = router;
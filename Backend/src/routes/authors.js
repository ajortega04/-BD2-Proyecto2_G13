const express = require('express');
const router = express.Router();
const {uploadFile} = require('../s3');
const multer = require('multer');
const upload = multer();


router.post('/create', upload.single('picture'), async (req, res) => {
    const {name, biography} = req.body;
    const result = await uploadFile(req.file);
    console.log(result)
});

router.post('/album/create', upload.single('picture'), async (req, res) => {
    try {
        const {name, release, description, ARTIST_idARTIST} = req.body;
        const result = await uploadFile(req.file);
        const sql = 'INSERT INTO ALBUM(name, `release`, description, ARTIST_idARTIST, portrait) VALUES (?, ?, ?, ?, ?)';
        DB.execute(sql, [name, release, description, ARTIST_idARTIST, result], (result) => {
            console.log(result);

            if (result.affectedRows === 1) {
                return res.status(201).json({msg: "Album created"});
            } else {
                return res.status(500).json({error: "Album not created"})
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error});
    }
});

module.exports = router;
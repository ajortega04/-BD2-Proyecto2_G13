const express = require('express')
const router = express.Router()
const CommentController = require('../controllers/CommentController')


router.post('/addComment',CommentController.postAddComment );
router.get('/:bookId',CommentController.getComment)

module.exports = router;

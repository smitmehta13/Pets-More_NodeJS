const commentController = require('../controllers/Comment');
const express = require('express');
 
const router= express.Router();

//Comment
 
router.get('/comment',commentController.findAllComments);

router.get('/comment/:id',commentController.findById);

router.get('/comment/product/:id',commentController.findCommentByProduct);
 
router.post('/comment',commentController.addComment);


router.put('/comment/:id',commentController.updateComment);

router.delete('/comment/:id',commentController.deleteComment);

 

module.exports = router;
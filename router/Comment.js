const commentController = require('../controllers/Comment');
const express = require('express');
 
const router= express.Router();

//User
 
router.get('/comment',commentController.findAllComments);

//router.get('/users/:id',userController.findById);
 
router.post('/comment',commentController.addComment);

//router.put('/users/:id',userController.updateUser);

//router.delete('/users/:id',userController.deleteUser);

 

module.exports = router;
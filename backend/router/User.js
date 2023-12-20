const userController = require('../controllers/User');
const express = require('express');
 
const router= express.Router();

//User
 
router.get('/user',userController.findAllUsers);

router.get('/user/:id',userController.findById);
 
router.post('/user',userController.addUser);

router.put('/user/:id',userController.updateUser);

router.delete('/user/:id',userController.deleteUser);

 

module.exports = router;
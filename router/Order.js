const orderController = require('../controllers/Order');
const express = require('express');
 
const router= express.Router();

//Product
 
router.get('/order',orderController.findAllOrders);

router.get('/order/:id',orderController.findById);
 
router.post('/order',orderController.addOrder);

router.put('/order/:id',orderController.updateOrder);

router.delete('/order/:id',orderController.deleteOrder);

 

module.exports = router;
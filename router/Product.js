const productController = require('../controllers/Product');
const express = require('express');
 
const router= express.Router();

//Product
 
router.get('/products',productController.findAllProducts);

router.get('/products/:id',productController.findById);
 
router.post('/products',productController.addProduct);

router.put('/products/:id',productController.updateProduct);

router.delete('/products/:id',productController.deleteProduct);

 

module.exports = router;
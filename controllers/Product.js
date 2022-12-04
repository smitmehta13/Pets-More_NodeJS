const mongoose = require('mongoose');
const Product = require('../models/Product');
const asyncHandler = require ('express-async-handler'); 

//Find all
const findAllProducts = asyncHandler( async (req,res) => {
// #swagger.tags = ['Product']
// #swagger.description = 'Endpoint to get all Products'
 
    Product.find({},(err,products)=>{
        err && res.status(500).send({message:`Error: ${err}`});
        !products && res.status(404).send({message:'No products found'});
         /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/products" },
               description: 'Products found.' 
        } */
        res.status(200).json(products);
    });

});


 


//Delete
const deleteProduct = asyncHandler(  async (req,res) => {
// #swagger.tags = ['Product']
// #swagger.description = 'Endpoint to delete a product'

    Product.findOneAndDelete({id:req.params.id},(err,product)=>{
        err && res.status(500).send({message:`Error: ${err}`});
        !product && res.status(404).send({message:'Product not found'});
        product && !err && res.status(200).send({message:`Product deleted`});
     

    });
});
    
//findById
const findById = asyncHandler( async (req,res )=>{
    // #swagger.tags = ['Product']
    // #swagger.description = 'Endpoint to get a product by ID'
    // #swagger.parameters['id'] = { description: 'ID Product.' }
    
    Product.findOne( 
        {id:req.params.id},
        (err,product)=>{
            err && res.status(500).send({message:`Error: ${err}`});
            !product && res.status(404).send({message:'Product not found'});
            
           !err && product && res.status(200).json(product);
        });
    
    
        
    });

   
    //Update a product
    
    const updateProduct = asyncHandler( async (req,res) => {
    // #swagger.tags = ['Product']
    // #swagger.description = 'Endpoint to update a Product'
    /* #swagger.parameters['updateProduct'] = {
                    in: 'body',
                    description: 'Product Information.',   
                    required: true,
                    schema: { $ref: "#/definitions/product" }
            } */
      
                Product.findOneAndUpdate({id:req.params.id},req
                .body,{new:true},(err,product)=>{
                    err && res.status(500).send({message:`Error: ${err}`});
                    !product && res.status(404).send({message:'Product not found'});
                    product && !err && res.status(200).json(product);
                    //check if not found

                });
            
            
    }) ;

     //Add   a product
const addProduct = asyncHandler( async (req,res) => {
    // #swagger.tags = ['Product']
    // #swagger.description = 'Endpoint to create a product'
    /* #swagger.parameters['newProduct'] = {
                   in: 'body',
                   description:  'product Information.',
                   required: true,
                   schema: { $ref: "#/definitions/product" }
            } */
           
                    Product.findOne({id:req.id},function(err,data){
                        if(!data){
    
                        let product = new Product({
                            
                            description:req.body.description,
                            image:req.body.ImageString,
                            pricePerUnit:req.body.pricePerUnit,
                            shippingCost:req.body.shippingCost

                        });
    
                        product.save((err, product)=>{
                            err && res.status(500).send({message:`Error: ${err}`});
                            !err && res.status(200).json (product);
                        });
                    }
                
            });
    
    }) ;
     
module.exports = {findAllProducts,findById,addProduct,updateProduct,deleteProduct} 
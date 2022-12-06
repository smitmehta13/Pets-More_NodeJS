const mongoose = require('mongoose');
const Order = require('../models/Order');
const asyncHandler = require ('express-async-handler'); 

//Find all
const findAllOrders = asyncHandler( async (req,res) => { 
    Order.find({},(err,orders)=>{
        err && res.status(500).send({message:`Error: ${err}`});
        !orders && res.status(404).send({message:'No orders found'});
        res.status(200).json(orders);
    });

});

//Delete
const deleteOrder = asyncHandler(  async (req,res) => {
    Order.findOneAndDelete({id:req.params.id},(err,order)=>{
        err && res.status(500).send({message:`Error: ${err}`});
        !order && res.status(404).send({message:'order not found'});
        order && !err && res.status(200).send({message:`order deleted`});
    });
});
    
//findById
const findById = asyncHandler( async (req,res )=>{
    Order.findOne( 
        {id:req.params.id},
        (err,order)=>{
            err && res.status(500).send({message:`Error: ${err}`});
            !order && res.status(404).send({message:'Order not found'});
            
           !err && order && res.status(200).json(order);
        });
    
    
        
    });

   
    //Update a order
    
    const updateOrder = asyncHandler( async (req,res) => {
  
                Order.findOneAndUpdate({id:req.params.id},req
                .body,{new:true},(err,order)=>{
                    err && res.status(500).send({message:`Error: ${err}`});
                    !order && res.status(404).send({message:'Ordder not found'});
                    order && !err && res.status(200).json(order);
                    //check if not found

                });
            
            
    }) ;

     //Add   a order
const addOrder = asyncHandler( async (req,res) => {
       Order.findOne({id:req.id},function(err,data){
              if(!data){
                 let order = new Order({
                      userId:req.body.userId,
                     dateTime:getDate(),
                      shippingAddress:req.body.shippingAddress,

                        });
    
                        order.save((err, order)=>{
                            err && res.status(500).send({message:`Error: ${err}`});
                            !err && res.status(200).json (order);
                        });
                    }
                
            });
    
    }) ;
     
module.exports = {findAllOrders,findById,addOrder,updateOrder,deleteOrder} 
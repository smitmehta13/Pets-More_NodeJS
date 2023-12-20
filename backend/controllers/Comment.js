const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const User = require('../models/User');
const Product = require('../models/Product');
const asyncHandler = require ('express-async-handler'); 
const db =mongoose.connection;

//Find all
const findAllComments = asyncHandler( async (req,res) => {
// #swagger.tags = ['Comment']
// #swagger.description = 'Endpoint to get all Comments'
 
Comment.find({},(err,comments)=>{
        err && res.status(500).send({message:`Error: ${err}`});
        !comments && res.status(404).send({message:'No Comments found'});
         /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/comments" },
               description: 'Comments found.' 
        } */
        res.status(200).json(comments);
    });

});


 
//Add   a comment
const addComment = asyncHandler( async (req,res) => {

// #swagger.tags = ['Comment']
// #swagger.description = 'Endpoint to create a comment'
/* #swagger.parameters['newComment'] = {

                in: 'body',
                description: 'Comment Information.',
                required: true,
                schema: { $ref: "#/definitions/comment" }
        } */
        
    // //Check if Product exists 
    const product= await
    Product.findOne({id:req.body.productId});
    if(!product){
        res.status(404).send({message:'Product not found'});
    }
    else
    {
    User.findOne({id:req.body.userId
    },(err,user)=>{
        err && res.status(500).send({message:`Error: ${err}`});
        //bad request

        !user && res.status(404).send({message:'User not found'});
         //if we find user
        if (user && res.status(200))
        {
        Comment.findOne({id:req.id},function(err,data){
            if(!data){
           
                Comment.findOne({},function(err,data){
 
                
                    let comment = new Comment({
                        rating:req.body.rating,
                        text:req.body.text,
                        image:req.body.image,
                        userId:req.body.userId,
                        productId:req.body.productId
                    });

                  
                    comment.save((err,comment)=>{
                        err && res.status(500).send({message:`Error: ${err}`});
                      
                           /* #swagger.responses[200] = {
                          schema: { $ref: "#/definitions/comment" },
                          description: 'Comment created.'
                  } */

                        !err && res.status(200).json(comment);
                    });

                }).sort({_id:-1}).limit(1);
            }else{
                res.status(500).send({message:'Comment already exists'});
            }
        });
        }


    });
    }
}); 
 
 

        

//Update a Comment

const updateComment = asyncHandler( async (req,res) => {
// #swagger.tags = ['Comment']
// #swagger.description = 'Endpoint to update a comment'
/* #swagger.parameters['updateComment'] = {
                in: 'body',
                description: 'Comment Information.',   
                required: true,
                schema: { $ref: "#/definitions/comment" }
        } */
  
            Comment.findOneAndUpdate({id:req.params.id},req
            .body,{new:true},(err,comment)=>{
                err && res.status(500).send({message:`Error: ${err}`});
                !comment && res.status(404).send({message:'Comment not found'});
                /* #swagger.responses[200] = {
                            schema: { $ref: "#/definitions/comment" },  
                            description: 'Comment updated.'
                    } */
                comment && !err && res.status(200).json(comment);
            });
        
        
}) ;

//Delete 
const deleteComment = asyncHandler(  async (req,res) => {
// #swagger.tags = ['Comment']
// #swagger.description = 'Endpoint to delete a comment'

    Comment.findOneAndDelete({id:req.params.id},(err,comment)=>{
        err && res.status(500).send({message:`Error: ${err}`});
        !comment && res.status(404).send({message:'Comment not found'});   
        comment && !err && res.status(200).send({message:`Comment deleted`});
    });
    //if not found
    

});
    
//findById
const findById = asyncHandler( async (req,res )=>{
    // #swagger.tags = ['Comment']
    // #swagger.description = 'Endpoint to get a comment by ID'
    // #swagger.parameters['id'] = { description: 'ID Comment.' }
    
    Comment.findOne( 
        {id:req.params.id},
        (err,comment)=>{
            err && res.status(500).send({message:`Error: ${err}`});
            !comment && res.status(404).send({message:'Comment not found'});
            
           !err && comment && res.status(200).json(comment);
        });
    
    
        
    });

     

    const findCommentByProduct = asyncHandler( async (req,res) => {
        // #swagger.tags = ['Comment']
        // #swagger.description = 'Endpoint to get a comment by product'
        // #swagger.parameters['id'] = { description: 'ID Product.' }
        Comment.find({productId:req.params.id},(err,comments)=>{
            err && res.status(500).send({message:`Error: ${err}`});
            !comments && res.status(404).send({message:'No comments found'});
            res.status(200).json(comments);
        }
        );
    });

module.exports = {findAllComments,addComment,findById,deleteComment,findCommentByProduct,updateComment} 
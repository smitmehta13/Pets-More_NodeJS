const mongoose = require('mongoose');
const Comment = require('../models/Comment');
const User = require('../models/User');
const asyncHandler = require ('express-async-handler'); 
const db =mongoose.connection;

//Find all
const findAllComments = asyncHandler( async (req,res) => {
// #swagger.tags = ['Comment']
// #swagger.description = 'Endpoint to get all Comments'
 
Comment.find({},(err,comments)=>{
        err && res.status(500).send({message:`Error: ${err}`});
        !comments && res.status(404).send({message:'No users found'});
         /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/users" },
               description: 'Users found.' 
        } */
        res.status(200).json(comments);
    });

});


 
//Add   a user
const addComment = asyncHandler( async (req,res) => {

// #swagger.tags = ['Comment']
// #swagger.description = 'Endpoint to create a comment'
/* #swagger.parameters['newComment'] = {

                in: 'body',
                description: 'Comment Information.',
                required: true,
                schema: { $ref: "#/definitions/comment" }
        } */
       
          

 
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
                        userId:req.body.userId
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


}); 

 
 

        


//         // Comment.findOne({id:req.id},function(err,data){
//         //     if(!data){
//         //         var c;
//         //         Comment.findOne({},function(err,data){

//         //             if (data) {
//         //                 console.log("if");
//         //                 c = data.id + 1;
//         //             }else{
//         //                 c=1;
//         //             }

//         //             let comment = new Comment({
//         //                 id:c,
//         //                 rating:req.body.rating,
//         //                 text:req.body.text,
//         //                 image:req.body.image,
//         //                 user:req.body.user
//         //             });

//         //             comment.save((err,comment)=>{
//         //                 err && res.status(500).send({message:`Error: ${err}`});
//         //                 !err && res.status(200).json(comment);
//         //             });
                
                    
//         //         }).sort({_id:-1}).limit(1);
//         //     }else{
//         //         res.status(500).send({message:'Comment already exists'});
//         //     }
//         // }
//         // );









// }) ;
 
//Update a User

// const updateUser = asyncHandler( async (req,res) => {
// // #swagger.tags = ['User']
// // #swagger.description = 'Endpoint to update a user'
// /* #swagger.parameters['updateUser'] = {
//                 in: 'body',
//                 description: 'User Information.',   
//                 required: true,
//                 schema: { $ref: "#/definitions/user" }
//         } */
  
//             User.findOneAndUpdate({id:req.params.id},req
//             .body,{new:true},(err,user)=>{
//                 err && res.status(500).send({message:`Error: ${err}`});
//                 !err && res.status(200).json(user);
//             });
        
        
// }) ;

// //Delete
// const deleteUser = asyncHandler(  async (req,res) => {
// // #swagger.tags = ['User']
// // #swagger.description = 'Endpoint to delete a user'

//     User.findOneAndDelete({id:req.params.id},(err,user)=>{
//         err && res.status(500).send({message:`Error: ${err}`});
//         !err && res.status(200).send({message:`User deleted`});
//     });
// });
    
// //findById
// const findById = asyncHandler( async (req,res )=>{
//     // #swagger.tags = ['User']
//     // #swagger.description = 'Endpoint to get a user by ID'
//     // #swagger.parameters['id'] = { description: 'ID de Usuario.' }
    
//     User.findOne( 
//         {id:req.params.id},
//         (err,user)=>{
//             err && res.status(500).send({message:`Error: ${err}`});
//             !user && res.status(404).send({message:'User not found'});
            
//            !err && user && res.status(200).json(user);
//         });
    
    
        
//     });

module.exports = {findAllComments,addComment} 
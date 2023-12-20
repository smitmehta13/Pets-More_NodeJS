const mongoose = require('mongoose');
const User = require('../models/User');
const asyncHandler = require ('express-async-handler'); 

//Find all
const findAllUsers = asyncHandler( async (req,res) => {
// #swagger.tags = ['User']
// #swagger.description = 'Endpoint to get all Users'
 
    User.find({},(err,users)=>{
        err && res.status(500).send({message:`Error: ${err}`});
        !users && res.status(404).send({message:'No users found'});
         /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/users" },
               description: 'Users found.' 
        } */
        res.status(200).json(users);
    });

});


 
//Add   a user
const addUser = asyncHandler( async (req,res) => {
// #swagger.tags = ['User']
// #swagger.description = 'Endpoint to create a user'
/* #swagger.parameters['newUser'] = {
               in: 'body',
               description: 'User Information.',
               required: true,
               schema: { $ref: "#/definitions/user" }
        } */
 
        User.findOne({email:req.email},function(err,data){
            if(!data){
                var c;
                User.findOne({},function(err,data){

                    if (data) {
                        console.log("if");
                        c = data.id + 1;
                    }else{
                        c=1;
                    }

                    let user = new User({
                        id:c,
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.password ,
                        shippingAddress:req.body.shippingAddress

                        
                    });

                    user.save((err,user)=>{
                        err && res.status(500).send({message:`Error: ${err}`});
                        !err && res.status(200).json(user);
                    });
                
                    

                }).sort({_id: -1}).limit(1);
               
            }else{
                res.send({"Success":"Email is already used."});
            }

        });

}) ;
 
//Update a User

const updateUser = asyncHandler( async (req,res) => {
// #swagger.tags = ['User']
// #swagger.description = 'Endpoint to update a user'
/* #swagger.parameters['updateUser'] = {
                in: 'body',
                description: 'User Information.',   
                required: true,
                schema: { $ref: "#/definitions/user" }
        } */
  
            User.findOneAndUpdate({id:req.params.id},req
            .body,{new:true},(err,user)=>{
                err && res.status(500).send({message:`Error: ${err}`});
                !user && res.status(404).send({message:'User not found'});
                user && !err && res.status(200).json(user);
            });
        
        
}) ;

//Delete
const deleteUser = asyncHandler(  async (req,res) => {
// #swagger.tags = ['User']
// #swagger.description = 'Endpoint to delete a user'

    User.findOneAndDelete({id:req.params.id},(err,user)=>{
        err && res.status(500).send({message:`Error: ${err}`});
        !user && res.status(404).send({message:'User not found'});
        user &&!err && res.status(200).send({message:`User deleted`});
        
      
    });
});
    
//findById
const findById = asyncHandler( async (req,res )=>{
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to get a user by ID'
    // #swagger.parameters['id'] = { description: 'ID de Usuario.' }
    
    User.findOne( 
        {id:req.params.id},
        (err,user)=>{
            err && res.status(500).send({message:`Error: ${err}`});
            !user && res.status(404).send({message:'User not found'});
            
           !err && user && res.status(200).json(user);
        });
    
    
        
    });

module.exports = {findAllUsers,findById,addUser,updateUser,deleteUser} 
 


const mongoose = require('mongoose');
const User = require('../models/User');
const deleteDatabase =(req,res) => {
     // #swagger.tags = ['Database']
    // #swagger.description = 'Endpoint to delete database'
    
    mongoose.connection.db.dropDatabase();
    res.send('Database deleted');
}

/* data to be inserted */
const userData = [
    {
        id:1,
        name:"John Doe",
        email:"test@email.com",
        password: "password",  
        shippingAddress:"1234 Main St"
    },
    {
        id:2,
        name:"Lopez Roman",
        email:"anotherTest@email.com",
        password:"supersecretpassword",  
        shippingAddress:"4321 Main St"
    },
    ];
 
 
 

  const createDatabase =
   (req,res) => {   
        // #swagger.tags = ['Database']
        // #swagger.description = 'Endpoint to create database'


          /* insert data of users */
        User.create( userData, function (err, users) {
        if ( err ) throw err;
         console.log( users + '\n-- users inserted successfully' )}
      );

      //creat others 
      
        res.send('Database created');

    } ;

    
 
//export
module.exports = {deleteDatabase,createDatabase};
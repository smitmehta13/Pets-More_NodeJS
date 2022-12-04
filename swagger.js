const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./router/User.js','./router/Database.js','./router/Comment.js','./router/Product.js']
const dotenv = require('dotenv').config();
const port = process.env.PORT||5000;
const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: `localhost:${port}`,
    basePath: "/api",
    schemes: ['https'],
    definitions: {
        user: {
            $id : 1 ,
            $name:"Jose Martinez",
            $email:"joshepp@hotmail.com",
            $password:"2s.lsds" ,
            $shippingAddress:"1234 Main St"  },
        users: [{
            $id : 1 ,
            $name:"Jose Martinez",
            $email:"joshepp@hotmail.com",
            $password:"2s.lsds",
            $shippingAddress:"1234 Main St" },

        ],
        comment:{
            $id:1,
            $rating:5,
            $text:"This is a comment",
            image: null,
            $userId:1
        },
        comments:[{
            $id:1,
            $rating:5,
            $text:"This is a comment",
            image: null,
            $userId:1
        }],

        product:{
            $id:1,
            $description:"This is a product",
            $ImageString: null,
            $pricePerUnit: 10.99,
            $shippingCost: 5.99
        },
        products:[{
            $id:1,
            $description:"This is a product",
            $ImageString: null,
            $pricePerUnit: 10.99,
            $shippingCost: 5.99
        }] 

    }
}
swaggerAutogen(outputFile, endpointsFiles,doc).then(() => {
    require('./server.js');  
  });
//Includes
const express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
//Handle request
const bodyParser = require('body-parser');
//conect to DB
const connectDB = require('./config/db')
//handle .env
const dotenv = require('dotenv').config();
//routes
const Users = require('./router/User');
const Database = require('./router/Database');
const Comment = require('./router/Comment');
//swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
//******************************************************

//Objs
const app = express();
//Configurations
const port = process.env.PORT||5000;

//Connect to DB
connectDB();
//conn.dropDatabase();

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Routes
app.use('/api',Users);
app.use('/api',Database);
app.use('/api',Comment);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };


//Server
https.createServer(
    // Provide the private and public key to the server by reading each
    // file's content with the readFileSync() method.
{
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
},
app
).listen(port,()=>{
console.log(`Server running on port ${port}`);
});
 
const mongoose = require('mongoose');
const dotenv = require('dotenv').config(); 
const database = process.env.MONGO_DATABASE;
const urlDataBase = process.env.MONGO_SERVER;

//create mongo conection
const connectDB = async ()=>{
    try {
        console.log(`Connecting to database ${database}`);
     const conn=  await mongoose.connect(
            `mongodb://${urlDataBase}/${database}`,
            {useNewUrlParser:true},
            (err,res)=>{
                 err && console.log(`Error connecting to database ${database} ${err.message}`);
                 !err  &&  console.log(`MongoDB Connected`);
            }
            
            );
 
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

 


module.exports = connectDB;
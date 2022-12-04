//Includes
const express = require("express");
var https = require("https");
var http = require("http");
var fs = require("fs");
//Handle request
const bodyParser = require("body-parser");
//conect to DB
const connectDB = require("./config/db");
//handle .env
const dotenv = require("dotenv").config();
//routes
const Users = require("./router/User");
const Database = require("./router/Database");
const Comment = require("./router/Comment");
const Product = require("./router/Product");
//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
// logger
const logger = require("morgan");
//******************************************************

//Objs
const app = express();

//Connect to DB
connectDB();

//Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api", Users);
app.use("/api", Database);
app.use("/api", Comment);
app.use("/api", Product);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
});

module.exports = app;

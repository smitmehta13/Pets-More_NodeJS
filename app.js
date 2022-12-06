//Includes
const express = require("express");
//Handle request
const bodyParser = require('body-parser');
//connect to DB
const connectDB = require("./config/db");
//routes
const Users = require("./router/User");
const Database = require("./router/Database");
const Comment = require("./router/Comment");
const Product = require("./router/Product");
const Cart = require("./router/Cart");
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
//handling bodyparser with big files
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//Routes
app.use("/api", Users);
app.use("/api", Database);
app.use("/api", Comment);
app.use("/api", Product);
app.use("/api", Cart);
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

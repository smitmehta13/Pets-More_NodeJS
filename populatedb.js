#! /usr/bin/env node

console.log(
  "This script populates some test users, products and carts to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require("async");
var User = require("./models/user");
var Product = require("./models/product");
var Cart = require("./models/cart");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var users = [];
var products = [];
var carts = [];

function userCreate(id, name, email, password, shippingAddress, cb) {
  userdetail = {
    id: id,
    name: name,
    email: email,
    password: password,
    shippingAddress: shippingAddress,
  };

  var user = new User(userdetail);

  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New User: " + user);
    users.push(user);
    cb(null, user);
  });
}

function productCreate(id, description, image, pricePerUnit, shippingCost, cb) {
  productdetail = {
    id: id,
    description: description,
    image: image,
    pricePerUnit: pricePerUnit,
    shippingCost: shippingCost,
  };

  var product = new Product(productdetail);

  product.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Product: " + product);
    products.push(product);
    cb(null, product);
  });
}

function cartCreate(user, products, cb) {
  cartdetail = {
    user: user,
    products: products,
  };

  var cart = new Cart(cartdetail);

  cart.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Cart: " + cart);
    carts.push(cart);
    cb(null, cart);
  });
}

function createUsers(cb) {
  async.series(
    [
      function (callback) {
        userCreate(
          1,
          "John Doe",
          "test@email.com",
          "password",
          "1234 Main St",
          callback
        );
      },
      function (callback) {
        userCreate(
          2,
          "Jane Doe",
          "test@email.com",
          "password",
          "1234 Main St",
          callback
        );
      },
      function (callback) {
        userCreate(
          3,
          "John Smith",
          "test@email.com",
          "password",
          "1234 Main St",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createProducts(cb) {
  async.series(
    [
      function (callback) {
        productCreate(
          1,
          "Product 1",
          "https://picsum.photos/200/300",
          10,
          5,
          callback
        );
      },
      function (callback) {
        productCreate(
          2,
          "Product 2",
          "https://picsum.photos/200/300",
          10,
          5,
          callback
        );
      },
      function (callback) {
        productCreate(
          3,
          "Product 3",
          "https://picsum.photos/200/300",
          10,
          5,
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createCarts(cb) {
  async.series(
    [
      function (callback) {
        cartCreate(users[0], [products[0], products[1]], callback);
      },
      function (callback) {
        cartCreate(users[1], [products[2]], callback);
      },
      function (callback) {
        cartCreate(users[2], [products[0]], callback);
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createUsers, createProducts, createCarts],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);

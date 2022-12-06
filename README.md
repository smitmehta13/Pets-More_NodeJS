<h1 align="center">
    <b>Web Shop API in<br> Node.js using MongoDB </b> 
<br>
</h1>

<p align="center">
  <a href="/LICENSE"><img src="https://img.shields.io/github/license/guruhariharaun/Registration-and-Login-Form-in-Nodejs-and-MongoDB.svg?style=flat-square"></a>
</p>

## What is this for?

### Assignment 4

-Instructions
-Server NodeJS
-Client PostMan
-Database MongoDB/Mongoose

### Task

Working in groups of up to 3, create a NodeJS implementation of the server components required to provide data from a MongoDB database instance to the Javascript client described in Project 1.
To complete this project, you will need database entities like the following:

- Product (description, image, pricing, shipping cost)
- User (email, password, username, purchase history, shipping address)
- Comments (product, user, rating, image(s), text)
- Cart (products, quantities, user)
- Order (recording of a sale)
  You will test your project using PostMan to validate your endpoints behave appropriately in both success and failure cases. Provide captured test output as part of your assignment submission. You should, in theory, be able to use the same PostMan tests for assignments 2-4.

### Marks

Distribution of marks is as follows:

- Proper use of DevOps/Git: 20%
- Correct and complete MongoDB implementation: 20%
- Correct and complete NodeJS API endpoints: 30%
- Full suite of PostMan tests: 30%

## Getting Started

### Deployment

This Project is not deployed yet.

## Running the tests

### swagger

Allows the developers to see the documentation
<img src="https://dev.azure.com/Jmartinezpineda4056/7fc0b520-5dad-49ab-a6f6-6d72204fad0f/_apis/git/repositories/0707e200-be92-4daf-987d-73de9331912d/items?path=/docs/swagger.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=master&resolveLfs=true&%24format=octetStream&api-version=5.0" height="400" width="500" style="border: 1px solid black;">

### DataBase:

Here we use **[MongoDB](https://www.mongodb.com)** as the database. Here we have these collections created, named as:

- users.
- counters.
- comments.
- products.
- carts.
- orders.

## Prerequisites

Tools that we need to run this app:

- **_[Node.js](https://nodejs.org/en/)_**
- **_[Node Package Manager](https://www.npmjs.com/get-npm)_**
- **_[MongoDB ](https://www.mongodb.com)_**

## Installing

```
npm install
```

## Connection to DataBase Access

## To Run the App In Development

```
npm run serverstart
```

## To Run and regenerate swagger.

```
npm run swagger-autogen
```

The server will start Running on

- https://localhost:4000/

swagger will be Running on

- https://localhost:4000/api-docs

## Author

| Author            | Profile Link                                  |
| ----------------- | :-------------------------------------------- |
| **Jose Martinez** | **[jamp](https://github.com/joshepp)**        |
| **Oscar Pinzon**  | **[opinzon](https://github.com/oscarpinzon)** |
| **Smith Mehta**   | **[smetha](https://github.com/smit-dm)**             |

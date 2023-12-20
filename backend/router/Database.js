const dbController = require('../controllers/Database');
const express = require('express');
 
const router= express.Router();
 
router.get('/deletedb',dbController.deleteDatabase);
router.get('/createdb',dbController.createDatabase);
 

module.exports = router;
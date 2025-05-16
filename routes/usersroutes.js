const express = require('express');
const router = express.Router();
const UsersController = require('../controller/userscontroller');


// CRUD Routes
// Create - POST
router.post('/register', UsersController.createUser);
router.post('/login', UsersController.getUserByUsernamePassword);


module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');




/* GET home page. */
router.get('/login', userController.login);
router.post('/register', userController.register);


module.exports = router;

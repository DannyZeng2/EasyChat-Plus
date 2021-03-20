/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Danny Zeng
 * @Date: 2021-03-20 21:06:53
 * @LastEditors: Danny Zeng
 * @LastEditTime: 2021-03-20 22:13:02
 */
const express = require('express');
const router = express.Router();
const userController = require('../controller/user_controller');

router.get('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;

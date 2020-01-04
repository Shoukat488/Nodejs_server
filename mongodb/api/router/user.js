const express = require('express');
const router = express.Router();
const checkAuth = require('../midleware/auth');
const UserController = require('../controllers/user');

router.post('/signup' , UserController.User_post_signup)

router.delete('/:userId' , checkAuth , UserController.User_delete_user);

router.post('/login' , UserController.User_login_user);

module.exports = router
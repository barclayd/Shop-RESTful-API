const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/user');

const checkAuth = require('../middleware/check-auth');

// create new user
router.post('/signup', UsersController.user_sign_up);

router.post('/login', UsersController.user_login);

router.delete('/:userId', checkAuth, UsersController.user_delete);

module.exports = router;

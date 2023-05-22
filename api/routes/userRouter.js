const express = require('express');
const router = express.Router();

const { AuthMiddleware } = require('../utils/AuthMiddleware');
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.delete('/logout', AuthMiddleware, userController.logout);
router.delete('/withdraw', AuthMiddleware, userController.withdrawUser);

module.exports = router;

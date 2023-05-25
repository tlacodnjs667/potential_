const express = require('express');
const router = express.Router();

const { AuthMiddleware } = require('../utils/AuthMiddleware');
const commentController = require('../controllers/commentController');

router.post('', AuthMiddleware, commentController.createComment);
router.get('', AuthMiddleware, commentController.getComment);
router.patch('', AuthMiddleware, commentController.modifyComment);
router.delete('', AuthMiddleware, commentController.deleteComment);

module.exports = router;

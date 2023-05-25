const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const spotRouter = require('./spotRouter');
const commentRouter = require('./commentRouter');

router.use('/user', userRouter);
router.use('/spot', spotRouter);
router.use('/comment', commentRouter);

module.exports = router;

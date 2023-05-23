const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const spotRouter = require('./spotRouter');

router.use('/user', userRouter);
router.use('/spot', spotRouter);

module.exports = router;

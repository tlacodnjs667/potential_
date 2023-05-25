const express = require('express');
const router = express.Router();

const spotController = require('../controllers/spotController');

const { AuthMiddleware } = require('../utils/AuthMiddleware');
const photoUploader = require('../utils/NCPUploader');

router.post('', spotController.getSpot);
router.post(
	'/upload',
	AuthMiddleware,
	photoUploader.single('photo'),
	spotController.createSpot
);

module.exports = router;

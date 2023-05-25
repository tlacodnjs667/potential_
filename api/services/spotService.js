const spotDao = require('../models/spotDao');

const getSpot = (longtitude, latitude) => {
	return spotDao.getSpot(longtitude, latitude);
};

const createSpot = async (
	user_id,
	spot_keyword_id,
	address,
	spotLongitude,
	spotLatitude,
	content,
	photo
) => {
	await spotDao.createSpot(
		user_id,
		spot_keyword_id,
		address,
		spotLongitude,
		spotLatitude,
		content,
		photo
	);

	return;
};

const getSpotForMain = (userId, longitude, latitude, distance) => {
	return spotDao.getSpotForMain(userId, longitude, latitude, distance);
};

const getSpotDetailForPopUp = async (userId, spotId) => {
	return spotDao.getSpotDetailForPopUp(userId, spotId);
};

module.exports = { getSpot, createSpot, getSpotForMain, getSpotDetailForPopUp };

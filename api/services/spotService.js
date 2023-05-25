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

module.exports = { getSpot, createSpot };

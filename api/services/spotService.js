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

const getSpotDetailForPopUp = (userId, spotId) => {
	return spotDao.getSpotDetailForPopUp(userId, spotId);
};

const deleteSpot = async (userId, spotId) => {
	const [check] = await spotDao.checkSpotAuthor(spotId);
	// 해당 작성글 없을 시, 에러
	if (!check) {
		const err = new Error('CANNOT_FIND_RESOURCE');
		err.statusCode = 404;
		throw err;
	}
	// 작성자 체크
	if (check.user_id !== userId) {
		const err = new Error('NOT_MATCH_AUTHOR');
		err.statusCode = 402;
		throw err;
	}

	return spotDao.deleteSpot(spotId);
};

module.exports = {
	getSpot,
	createSpot,
	getSpotForMain,
	getSpotDetailForPopUp,
	deleteSpot,
};

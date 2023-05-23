const spotDao = require('../models/spotDao');

const getSpot = (longtitude, latitude) => {
	return spotDao.getSpot(longtitude, latitude);
};

module.exports = { getSpot };

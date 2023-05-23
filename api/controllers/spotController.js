const spotService = require('../services/spotService');

const getSpot = async (req, res) => {
	const { longtitude, latitude } = req.body;

	const data = await spotService.getSpot(longtitude, latitude);
	res.status(200).json({ data });
};

module.exports = { getSpot };

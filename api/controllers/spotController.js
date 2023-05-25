const spotService = require('../services/spotService');
const { catchAsync } = require('../utils/globalErrorHandler');

const getSpot = catchAsync(async (req, res) => {
	const { longitude, latitude } = req.body;

	const data = await spotService.getSpot(longitude, latitude);
	res.status(200).json({ data });
});

const createSpot = catchAsync(async (req, res) => {
	const { address, spotLongitude, spotLatitude, content, spot_keyword_id } =
		req.body;
	const { location } = req.file;

	await spotService.createSpot(
		req.user,
		spot_keyword_id,
		address,
		spotLongitude,
		spotLatitude,
		content,
		location
	);

	res.status(201).json({ message: 'SPOT_CREATED' });
});

module.exports = { getSpot, createSpot };

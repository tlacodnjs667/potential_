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

const getSpotForMain = catchAsync(async (req, res) => {
	const { longitude, latitude, distance } = req.query;

	const data = await spotService.getSpotForMain(
		req.user,
		longitude,
		latitude,
		distance
	);

	res.status(200).json({ data });
});

const getSpotDetailForPopUp = catchAsync(async (req, res) => {
	const { spotId } = req.query;

	const data = await spotService.getSpotDetailForPopUp(req.user, spotId);
	res.status(200).json({ data });
});

const deleteSpot = catchAsync(async (req, res) => {
	const { spotId } = req.query;

	await spotService.deleteSpot(req.user, spotId);
	res.status(204);
});

module.exports = {
	getSpot,
	createSpot,
	getSpotForMain,
	getSpotDetailForPopUp,
	deleteSpot,
};

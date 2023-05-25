const { catchAsync } = require('../utils/globalErrorHandler');
const commentService = require('../services/commentService');

const createComment = catchAsync(async (req, res) => {
	const { comment } = req.body;
	const { spotId } = req.query;

	if (!comment || !spotId) {
		const err = new Error('INVALID_REQUEST');
		err.statusCode = 404;
		throw err;
	}

	await commentService.createComment(req.user, spotId, comment);
	res.status(201).json({ message: 'COMMENT_CREATED' });
});

const getComment = async (req, res) => {
	const { spotId, skip, take } = req.query;

	if (!spotId) {
		const error = new Error('INVALID_REQUEST');
		error.statusCode = 400;
		throw error;
	}

	const data = await commentService.getComment(req.user, spotId, skip, take);

	res.status(200).json({ data });
};

module.exports = { createComment, getComment };

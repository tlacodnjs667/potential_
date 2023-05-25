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

module.exports = { createComment };

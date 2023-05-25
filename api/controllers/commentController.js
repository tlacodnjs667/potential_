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

const getComment = catchAsync(async (req, res) => {
	const { spotId, skip, take } = req.query;

	if (!spotId) {
		const error = new Error('INVALID_REQUEST');
		error.statusCode = 400;
		throw error;
	}

	const [data] = await commentService.getComment(req.user, spotId, skip, take);
	data.commentBySpot = JSON.parse(data.commentBySpot);

	res.status(200).json({ data });
});

const modifyComment = catchAsync(async (req, res) => {
	const { comment } = req.body;
	const { commentId } = req.query;

	await commentService.modifyComment(req.user, commentId, comment);

	res.status(200).json({ message: 'COMMENT_MODIFIED' });
});

const deleteComment = catchAsync(async (req, res) => {
	const { commentId } = req.query;

	await commentService.deleteComment(req.user, commentId);

	res.status(204).json();
});

module.exports = { createComment, getComment, modifyComment, deleteComment };

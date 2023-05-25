const commentDao = require('../models/commentDao');

const createComment = (userId, spotId, comment) => {
	return commentDao.createComment(userId, spotId, comment);
};

const getComment = (userId, spotId, skip, take) => {
	return commentDao.getComment(userId, spotId, skip, take);
};

const modifyComment = async (userId, commentId, comment) => {
	const [checkAuthor] = await commentDao.checkCommentAuthor(commentId);

	if (!checkAuthor) {
		const error = new Error('CANNOT_FIND_COMMENT');
		error.statusCode = 404;
		throw error;
	}

	if (checkAuthor.user_id !== userId) {
		const error = new Error(`UNMATCHED_AUTHOR`);
		error.statusCode = 401;
		throw error;
	}

	return commentDao.modifyComment(commentId, comment);
};

const deleteComment = async (userId, commentId) => {
	const [checkAuthor] = await commentDao.checkCommentAuthor(commentId);

	if (!checkAuthor) {
		const error = new Error('CANNOT_FIND_COMMENT');
		error.statusCode = 404;
		throw error;
	}

	if (checkAuthor.user_id !== userId) {
		const error = new Error('UNMATCHED_AUTHOR');
		error.statusCode = 401;
		throw error;
	}

	return commentDao.deleteComment(commentId);
};

module.exports = { createComment, getComment, modifyComment, deleteComment };

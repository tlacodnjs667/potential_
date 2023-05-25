const commentDao = require('../models/commentDao');

const createComment = (userId, spotId, comment) => {
	return commentDao.createComment(userId, spotId, comment);
};

const getComment = (userId, spotId, skip, take) => {
	return commentDao.getComment(userId, spotId, skip, take);
};

const modifyComment = async (userId, commentId, comment) => {
	const [checkAuthor] = await commentDao.checkCommentAuthor(commentId);

	if (checkAuthor.user_id !== userId) {
		const error = new Error(`UNMATCHED_USER`);
		error.statusCode = 400;
		throw error;
	}

	return commentDao.modifyComment(commentId, comment);
};

module.exports = { createComment, getComment, modifyComment };

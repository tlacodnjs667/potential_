const commentDao = require('../models/commentDao');

const createComment = (userId, spotId, comment) => {
	return commentDao.createComment(userId, spotId, comment);
};

const getComment = (userId, spotId, skip, take) => {
	return commentDao.getComment(userId, spotId, skip, take);
};

module.exports = { createComment, getComment };

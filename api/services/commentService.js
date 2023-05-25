const commentDao = require('../models/commentDao');

const createComment = (userId, spotId, comment) => {
	return commentDao.createComment(userId, spotId, comment);
};

module.exports = { createComment };

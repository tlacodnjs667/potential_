const { serviceDataSource } = require('./appDataSource');

const createComment = (userId, spotId, comment) => {
	return serviceDataSource.query(`
        INSERT INTO comments (
            user_id,
            spot_id,
            comment
        ) VALUES (
            ${userId},
            ${spotId},
            '${comment}'
        );
    `);
};

module.exports = { createComment };

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

const getComment = (userId, spotId, skip = 0, take = 10) => {
	return serviceDataSource.query(`
        SELECT
            spots.id AS spotId,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'commentId', comments.id,
                    'comment', comment,
                    'IS_AUTHOR', IF(comments.user_id = ${userId}, true, false)
                )
            ) AS commentBySpot
        FROM spots
        LEFT JOIN comments ON comments.spot_id = spots.id
        WHERE spots.id = ${spotId}
        GROUP BY spotId
        LIMIT ${take} OFFSET ${skip}
    `);
};

const checkCommentAuthor = (commentId) => {
	return serviceDataSource.query(`
        SELECT
            user_id
        FROM comments
        WHERE id = ${commentId};
    `);
};

const modifyComment = (commentId, comment) => {
	return serviceDataSource.query(`
        UPDATE comments
        SET comment = '${comment}'
        WHERE id = ${commentId};
    `);
};

const deleteComment = (commentId) => {
	return serviceDataSource.query(`
        DELETE FROM comments
        WHERE id = ${commentId}
    `);
};

module.exports = {
	createComment,
	getComment,
	checkCommentAuthor,
	modifyComment,
	deleteComment,
};

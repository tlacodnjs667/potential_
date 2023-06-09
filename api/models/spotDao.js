const { serviceDataSource } = require('./appDataSource');

const getSpot = async (longitude, latitude) => {
	await serviceDataSource.query(`
        SET @location = POINT(${longitude}, ${latitude});
    `);

	return serviceDataSource.query(`
        SELECT  
            spots.id, 
            address,
            ST_Distance_Sphere(@location, POINT(longitude, latitude)) AS distance,
            spot_keyword.keyword AS spot_keyword,
            longitude,
            latitude,
            content,
            photo,
            spots.created_at,
            users.nickname
        FROM spots 
        LEFT JOIN users ON spots.user_id = users.id
        LEFT JOIN spot_keyword ON spots.spot_keyword_id = spot_keyword.id
        WHERE ST_Distance_Sphere(@location, POINT(longitude, latitude)) <= 100000000000
        ORDER BY distance;
    `);
};

const createSpot = async (
	user_id,
	spot_keyword_id = 1,
	address,
	longitude,
	latitude,
	content,
	photo
) => {
	return serviceDataSource.query(`
        INSERT INTO spots (
            user_id,
            spot_keyword_id,
            address,
	        longitude,
	        latitude,
	        content,
	        photo
        ) VALUES (
            ${user_id},
            ${spot_keyword_id},
            "${address}",
            ${longitude},
            ${latitude},
            "${content}",
            "${photo}"
        );
    `);
};

const getSpotForMain = async (userId, longitude, latitude, distance) => {
	await serviceDataSource.query(`
        SET @location = POINT(${longitude}, ${latitude});
    `);

	return serviceDataSource.query(`
        SELECT 
            spots.id AS spotId,
            address,
            spots.longitude,
            spots.latitude,
            ST_Distance_Sphere(@location, POINT(longitude, latitude)) AS distance,
            spot_keyword.id AS keywordId,
            spot_keyword.img AS keywordImg,
            keyword,
            IF (user_id = ${userId}, true, false) AS IS_OWNER
        FROM spots
        LEFT JOIN spot_keyword ON spots.spot_keyword_id = spot_keyword.id
        WHERE ST_Distance_Sphere(@location, POINT(longitude, latitude)) <= ${distance}
        ORDER BY distance;
    `);
};

const getSpotDetailForPopUp = async (userId, spotId) => {
	return serviceDataSource.query(`
        SELECT 
            spots.id AS spotId, 
            spots.address,
            spots.content,
            spots.photo,
            users.nickname,
            IF (spots.user_id = ${userId}, true, false) AS IS_OWNER,
            spot_keyword.keyword,
            spot_keyword.img AS keywordImg,
            COUNT(likeforCnt.id) AS likeCount,
            IF (UserLike.user_id = ${userId}, true, false) AS IS_LIKE,
            COUNT(comments.id) AS commentCnt
        FROM spots
        LEFT JOIN spot_keyword ON spots.spot_keyword_id = spot_keyword.id
        LEFT JOIN users ON users.id = spots.user_id
        LEFT JOIN spot_likes AS likeforCnt ON likeforCnt.spot_id = spots.id
        LEFT JOIN spot_likes AS UserLike 
            ON UserLike.spot_id = spots.id AND UserLike.user_id = users.id
        LEFT JOIN comments ON spots.id = comments.spot_id
        WHERE spots.id = ${spotId}
        GROUP BY spots.id;
    `);
};

const checkSpotAuthor = (spotId) => {
	return serviceDataSource.query(`
        SELECT
            id,
            user_id
        FROM spots
        WHERE id = ${spotId};
    `);
};

const deleteSpot = (spotId) => {
	return serviceDataSource.query(`
        DELETE FROM spots
        WHERE id = ${spotId}
    `);
};

module.exports = {
	getSpot,
	createSpot,
	getSpotForMain,
	getSpotDetailForPopUp,
	checkSpotAuthor,
	deleteSpot,
};

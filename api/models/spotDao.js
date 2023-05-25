const { serviceDataSource } = require('./appDataSource');

const getSpot = async (longtitude, latitude) => {
	await serviceDataSource.query(`
        SET @location = POINT(${longtitude}, ${latitude});
    `);

	return serviceDataSource.query(`
        SELECT  
            spots.id, 
            address,
            ST_Distance_Sphere(@location, POINT(spotLongitude, spotLatitude)) AS distance,
            spot_keyword.keyword AS spot_keyword,
            spotLongitude,
            spotLatitude,
            content,
            photo,
            spots.created_at,
            users.nickname
        FROM spots 
        LEFT JOIN users ON spots.user_id = users.id
        LEFT JOIN spot_keyword ON spots.spot_keyword_id = spot_keyword.id
        WHERE ST_Distance_Sphere(@location, POINT(spotLongitude, spotLatitude)) <= 100000000000
        ORDER BY distance;
    `);
};

const createSpot = async (
	user_id,
	spot_keyword_id = 1,
	address,
	spotLongitude,
	spotLatitude,
	content,
	photo
) => {
	serviceDataSource.query(`
        INSERT INTO spots (
            user_id,
            spot_keyword_id,
            address,
	        spotLongitude,
	        spotLatitude,
	        content,
	        photo
        ) VALUES (
            ${user_id},
            ${spot_keyword_id},
            "${address}",
            ${spotLongitude},
            ${spotLatitude},
            "${content}",
            "${photo}"
        );
    `);
};

module.exports = { getSpot, createSpot };

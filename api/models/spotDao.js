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
            spot_keyword_id AS spot_keyword,
            spotLongitude,
            spotLatitude,
            content,
            photo,
            spots.created_at,
            users.nickname
        FROM spots 
        LEFT JOIN users ON spots.user_id = users.id
        WHERE ST_Distance_Sphere(@location, POINT(spotLongitude, spotLatitude)) <= 100000000000
        ORDER BY distance;
    `);
};

module.exports = { getSpot };

const { serviceDataSource } = require('./appDataSource');

const getSpot = async (longtitude, latitude) => {
	await serviceDataSource.query(`
        SET @location = POINT(${longtitude}, ${latitude});
    `);

	return serviceDataSource.query(`
        SELECT  
            id, 
            address, 
            ST_Distance_Sphere(@location, POINT(spotLongtitude, spotLatitude)) AS distance 
        FROM spots 
        WHERE ST_Distance_Sphere(@location, POINT(spotLongtitude, spotLatitude)) <= 1200
        ORDER BY distance;
    `);
};

module.exports = { getSpot };

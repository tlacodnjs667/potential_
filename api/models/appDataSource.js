const { DataSource } = require('typeorm');

const serviceDataSource = new DataSource({
	type: process.env.TYPEORM_CONNECTION,
	host: process.env.TYPEORM_HOST,
	port: process.env.TYPEORM_PORT,
	username: process.env.TYPEORM_USERNAME,
	database: process.env.TYPEORM_DATABASE,
	password: process.env.TYPEORM_PASSWORD,
});

serviceDataSource
	.initialize()
	.then(() => {
		console.log('DATASOURCE_HAS_BEEN_INITIALIZED|ON_DEV_');
	})
	.catch((err) => {
		console.error(err);
		serviceDataSource.destroy();
	});

module.exports = { serviceDataSource };

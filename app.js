const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const { serviceDataSource } = require('./api/models/appDataSource');

const router = require('./api/routes/index');
const { globalErrorHandler } = require('./api/utils/globalErrorHandler');

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(router);
app.use(globalErrorHandler);

app.get('/ping', (req, res) => {
	res.status(200).json({ message: '!PONG!' });
});

const start = () => {
	try {
		app.listen(3000, () => {
			console.log(
				`SERVER_IS_LISTENING_ON_THE_PORT_${process.env.BE_SERVER_PORT}`
			);
		});
	} catch (err) {
		console.log(err);
		throw err;
	}
};

start();

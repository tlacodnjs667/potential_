const { JWTUtil } = require('./AuthUtil');
const userDao = require('../models/userDao');
const { catchAsync } = require('./globalErrorHandler');

const AuthMiddleware = catchAsync(async (req, res, next) => {
	const { access_token } = req.headers;

	if (!access_token) {
		const err = new Error('CANNOT_FIND_TOKEN');
		err.statusCode = 404;
		throw err;
	}

	const user = JWTUtil.__validate_JWT(access_token);

	const [{ token }] = await userDao.getUserTokenFromDB(user.id);

	if (access_token !== token) {
		const error = new Error('INVALID_TOKEN');
		error.statusCode = 401;
		throw error;
	}

	req.user = user.id;

	next();
});

module.exports = { AuthMiddleware };
// 만약 DB 에 저장된 토큰에

const { JWTUtil } = require('./AuthUtil');

const AuthMiddleware = async (req, res, next) => {
	const { access_token } = req.headers;

	if (!access_token) {
		const err = new Error('CANNOT_FIND_TOKEN');
		err.statusCode = 404;
		throw err;
	}

	const { user } = await JWTUtil.__validate_JWT(access_token);

	req.user = user.id;

	next();
};

module.exports = { AuthMiddleware };
// 만약 DB 에 저장된 토큰에

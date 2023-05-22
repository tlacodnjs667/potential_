const jwt = require('jsonwebtoken');

class JWTUtil {
	static __publish_JWT(user) {
		return jwt.sign(user, process.env.JWT_SECRETKEY, { expiresIn: '5h' });
	}

	static __validate_JWT(token) {
		return jwt.verify(token, process.env.JWT_SECRETKEY);
	}
}

module.exports = { JWTUtil };

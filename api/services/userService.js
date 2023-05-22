const userDao = require('../models/userDao');
const { JWTUtil } = require('../utils/AuthUtil');
const { EncryptionUtil } = require('../utils/PasswordEncryption');

const signup = async (email, nickname, password) => {
	const checkInDB = await userDao.getUserInfoInDB(email);

	if (checkInDB.length) {
		const error = new Error('DUPLICATED_EMAIL');
		error.statusCode = 409;
		throw error;
	}

	const Encrypted = await EncryptionUtil.__encrypt_psword(password);
	await userDao.createUser(email, nickname, Encrypted);

	return;
};

const signin = async (email, password) => {
	const [userInfoInDB] = await userDao.getUserInfoInDB(email);

	if (!userInfoInDB) {
		const error = new Error('UNDEFINED_USER');
		error.statusCode = 400;
		throw error;
	}
	if (!EncryptionUtil.__check_password(password, userInfoInDB.psword)) {
		const error = new Error('BAD_PASSWORD');
		error.statusCode = 400;
		throw error;
	}

	const access_token = JWTUtil.__publish_JWT({
		id: userInfoInDB.id,
		nickname: userInfoInDB.nickname,
	});

	await userDao.storeUserAccessToken(userInfoInDB.id, access_token);
	return access_token;
};

const logout = async (userId) => {
	await userDao.userLogout(userId);
};

const withdraw = async (userId) => {
	return userDao.deleteUser(userId);
};

module.exports = { signup, signin, logout, withdraw };

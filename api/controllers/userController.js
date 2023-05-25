const { catchAsync } = require('../utils/globalErrorHandler');
const userService = require('../services/userService');

const signup = catchAsync(async (req, res) => {
	const { email, nickname, password } = req.body;

	if (!email || !nickname || !password) {
		const error = new Error('INVALID_REQUEST');
		error.statusCode = 400;
		throw error;
	}

	await userService.signup(email, nickname, password);

	res.status(201).json({ message: 'USER_CREATED' });
});

const signin = catchAsync(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		const error = new Error('INVALID_REQUEST');
		error.statusCode = 400;
		throw error;
	}

	const access_token = await userService.signin(email, password);

	res.status(200).json({ message: 'LOGIN_SUCCESS', access_token });
});

const logout = catchAsync(async (req, res) => {
	const { user } = req;
	const result = await userService.logout(user);

	res.status(200).json({ message: 'LOGOUT_SUCCESS', result });
});

const withdrawUser = catchAsync(async (req, res) => {
	const { user } = req;

	await userService.withdraw(user);

	res.status(200).json({ message: 'USER_DELETED' });
});

module.exports = { signup, signin, logout, withdrawUser };

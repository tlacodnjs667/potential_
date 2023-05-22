const { serviceDataSource } = require('./appDataSource');

const getUserInfoInDB = (email) => {
	return serviceDataSource.query(`
        SELECT
            id,
            nickname,
            psword
        FROM users
        WHERE email = '${email}'
    `);
};

const createUser = (email, nickname, password) => {
	return serviceDataSource.query(`
        INSERT INTO users (
            email, 
            nickname, 
            psword
        ) VALUES (
            '${email}',
            '${nickname}',
            '${password}'
        );
    `);
};

const storeUserAccessToken = (id, access_token) => {
	return serviceDataSource.query(`
        UPDATE users
        SET token = '${access_token}'
        WHERE id = ${id}
    `);
};

const getUserTokenFromDB = (userId) => {
	return serviceDataSource.query(`
        SELECT
            token
        FROM users
        WHERE id = ${userId}
    `);
};

const userLogout = (userId) => {
	return serviceDataSource.query(`
        UPDATE users
        SET token = NULL
        WHERE id = ${userId}
    `);
};

const deleteUser = (userId) => {
	return serviceDataSource.query(`
        DELETE FROM users
        WHERE id = ${userId}
    `);
};

module.exports = {
	getUserInfoInDB,
	createUser,
	storeUserAccessToken,
	getUserTokenFromDB,
	userLogout,
	deleteUser,
};

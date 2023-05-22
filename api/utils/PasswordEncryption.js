const bcrypt = require('bcrypt');

class EncryptionUtil {
	static __encrypt_psword(psword) {
		return bcrypt.hash(psword, Number(process.env.BCRYPT_SALT_ROUND));
	}

	static __check_password(pw, encrypted_pw) {
		// DB 내 암호화된 PW와 체크
		return bcrypt.compare(pw, encrypted_pw);
	}
}

module.exports = { EncryptionUtil };

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

/*
    로그아웃 기능 개발 시,
    1. Token 발행과 동시에 DB 내 Token DATA 저장하는 과정 추가. 
    -> 세션에 대한 공부 이후 세션 이용하는 방향으로 
    
    2. Token 검증 시,
    Token verify 후, DB 내에 해당 유저의 Token 값과 동일한지 더블 체크

    3. 로그 아웃 기능에서 DB 내 유저의 Token 삭제
*/

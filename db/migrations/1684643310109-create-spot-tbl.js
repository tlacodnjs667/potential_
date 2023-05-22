module.exports = class CreateSpotTbl1684643310109 {
	async up(queryRunner) {
		await queryRunner.query(`
            CREATE TABLE spots (
                id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL DEFAULT 1,
                spot_keyword_id INT NOT NULL,
                address VARCHAR (100) NULL,
                spotLongtitude DECIMAL(18,10) NOT NULL,
                spotLatitude DECIMAL(18,10) NOT NULL,
                content VARCHAR(300) NOT NULL,
                photo VARCHAR(300) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
                FOREIGN KEY (spot_keyword_id) REFERENCES spot_keyword (id) ON DELETE CASCADE
            );
        `);
	}

	async down(queryRunner) {
		await queryRunner.query(`
            DROP TABLE spots;
        `);
	}
};

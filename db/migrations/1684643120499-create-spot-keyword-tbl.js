module.exports = class CreateSpotKeywordTbl1684643120499 {
	async up(queryRunner) {
		await queryRunner.query(`
            CREATE TABLE spot_keyword (
                id INT NOT NULL AUTO_INCREMENT,
                keyword VARCHAR(30) NOT NULL,
                img VARCHAR(100) NOT NULL,
                PRIMARY KEY (id)
            );
        `);
	}

	async down(queryRunner) {
		await queryRunner.query(`
            DROP TABLE spot_keyword;
        `);
	}
};

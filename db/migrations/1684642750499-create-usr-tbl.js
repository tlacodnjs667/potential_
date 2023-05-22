const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateUsrTbl1684642750499 {
	async up(queryRunner) {
		await queryRunner.query(`
            CREATE TABLE users (
                id INT NOT NULL AUTO_INCREMENT,
                nickname VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL,
                psword VARCHAR(100) NOT NULL,
                b_year INT NOT NULL,
                b_month INT NOT NULL,
                b_date INT NOT NULL,
                jwt VARCHAR(500),
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );
        `);
	}

	async down(queryRunner) {
		await queryRunner.query(`
            DROP TABLE users;
        `);
	}
};
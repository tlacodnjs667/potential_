const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateCommentTbl1684644921314 {
	async up(queryRunner) {
		await queryRunner.query(`
            CREATE TABLE comments (
                id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                spot_id INT NOT NULL,
                comment VARCHAR(300) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERECES users (id),
                FOREIGN KEY (spot_id) REFERECES spots (id)
            );
        `);
	}

	async down(queryRunner) {
		await queryRunner.query(`
            DROP TABLE comments;
        `);
	}
};

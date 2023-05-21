const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class CreateLikesTbl1684645253500 {
	async up(queryRunner) {
		await queryRunner.query(`
            CREATE TABLE spot_likes (
                id INT NOT NULL AUTO_INCREMENT,
                user_id INT NOT NULL,
                spot_id INT NOT NULL,
                like BOOL NOT NULL,
                PRIMARY KEY (id),
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (spot_id) REFERENCES spots (id)
            );
        
        `);
	}

	async down(queryRunner) {}
};

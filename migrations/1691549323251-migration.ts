import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1691549323251 implements MigrationInterface {
    name = 'Migration1691549323251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`uid\` int NOT NULL, \`created_at\` datetime NULL, \`updated_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneToUser1787895558246 implements MigrationInterface {
    name = 'AddPhoneToUser1787895558246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}

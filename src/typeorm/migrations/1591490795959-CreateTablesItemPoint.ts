import {MigrationInterface, QueryRunner} from "typeorm";

export default class CreateTablesItemPoint1591490795959 implements MigrationInterface {
    name = 'CreateTablesItemPoint1591490795959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "title" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba5885359424c15ca6b9e79bcf6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "points" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "image" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "whatsapp" character varying NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "city" character varying NOT NULL, "uf" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57a558e5e1e17668324b165dadf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "points"`);
        await queryRunner.query(`DROP TABLE "items"`);
    }

}

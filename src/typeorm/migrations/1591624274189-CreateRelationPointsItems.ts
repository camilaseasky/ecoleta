import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRelationPointsItems1591624274189 implements MigrationInterface {
    name = 'CreateRelationPointsItems1591624274189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "points_items" ("pointsId" uuid NOT NULL, "itemsId" uuid NOT NULL, CONSTRAINT "PK_5c918bb752cdac6b3140608c9a8" PRIMARY KEY ("pointsId", "itemsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4e116a0ad691a026ac37974b27" ON "points_items" ("pointsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_65d389b96ba85662ab4ddaef5e" ON "points_items" ("itemsId") `);
        await queryRunner.query(`ALTER TABLE "points_items" ADD CONSTRAINT "FK_4e116a0ad691a026ac37974b27b" FOREIGN KEY ("pointsId") REFERENCES "points"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "points_items" ADD CONSTRAINT "FK_65d389b96ba85662ab4ddaef5ef" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points_items" DROP CONSTRAINT "FK_65d389b96ba85662ab4ddaef5ef"`);
        await queryRunner.query(`ALTER TABLE "points_items" DROP CONSTRAINT "FK_4e116a0ad691a026ac37974b27b"`);
        await queryRunner.query(`DROP INDEX "IDX_65d389b96ba85662ab4ddaef5e"`);
        await queryRunner.query(`DROP INDEX "IDX_4e116a0ad691a026ac37974b27"`);
        await queryRunner.query(`DROP TABLE "points_items"`);
    }

}

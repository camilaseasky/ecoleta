import {MigrationInterface, QueryRunner} from "typeorm";

export default class CreateRelationPointsItems1591491462273 implements MigrationInterface {
    name = 'CreateRelationPointsItems1591491462273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "points_items_items" ("pointsId" uuid NOT NULL, "itemsId" uuid NOT NULL, CONSTRAINT "PK_a08a7d48f9e830bdf8075aa2399" PRIMARY KEY ("pointsId", "itemsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_75d629d37cb6d7e95c94ea3831" ON "points_items_items" ("pointsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5c7c7ab112e12de50b03952480" ON "points_items_items" ("itemsId") `);
        await queryRunner.query(`ALTER TABLE "points_items_items" ADD CONSTRAINT "FK_75d629d37cb6d7e95c94ea38310" FOREIGN KEY ("pointsId") REFERENCES "points"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "points_items_items" ADD CONSTRAINT "FK_5c7c7ab112e12de50b03952480f" FOREIGN KEY ("itemsId") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "points_items_items" DROP CONSTRAINT "FK_5c7c7ab112e12de50b03952480f"`);
        await queryRunner.query(`ALTER TABLE "points_items_items" DROP CONSTRAINT "FK_75d629d37cb6d7e95c94ea38310"`);
        await queryRunner.query(`DROP INDEX "IDX_5c7c7ab112e12de50b03952480"`);
        await queryRunner.query(`DROP INDEX "IDX_75d629d37cb6d7e95c94ea3831"`);
        await queryRunner.query(`DROP TABLE "points_items_items"`);
    }

}

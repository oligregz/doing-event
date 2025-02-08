import { MigrationInterface, QueryRunner } from "typeorm";

export class EventTable1738974305812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        await queryRunner.query(`
            CREATE TABLE "event" (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                description varchar(256) NOT NULL,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,

                CONSTRAINT event_pk PRIMARY KEY (id)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "event";`);
    }
}
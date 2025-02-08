import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1738974321921 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

        await queryRunner.query(`
            CREATE TABLE "user" (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                name varchar(255) NOT NULL,
                rg varchar(20) NOT NULL,
                cpf varchar(14) NOT NULL,
                cnpj varchar(18),
                date_of_birth date NOT NULL,
                email varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                created_at timestamp DEFAULT CURRENT_TIMESTAMP,
                updated_at timestamp DEFAULT CURRENT_TIMESTAMP,

                CONSTRAINT pk_user PRIMARY KEY (id),
                CONSTRAINT uq_user_name UNIQUE (name),
                CONSTRAINT uq_user_cpf UNIQUE (cpf),
                CONSTRAINT uq_user_email UNIQUE (email)
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "user";`);
    }
}
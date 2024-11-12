import { MigrationInterface, QueryRunner } from "typeorm";

export class Tickets1731278891748 implements MigrationInterface {
    name = 'Tickets1731278891748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tickets_model" (
            "ticket_id" SERIAL NOT NULL, 
            "type" character varying(50) NOT NULL, 
            "summary" character varying(255) NOT NULL, 
            "detail" text NOT NULL, 
            "hours" numeric(5,2), 
            "timer" text NOT NULL, 
            "notes" text, 
            CONSTRAINT "PK_3cb8db176901a19f1e02be8effe" PRIMARY KEY ("ticket_id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tickets_model"`);
    }
}

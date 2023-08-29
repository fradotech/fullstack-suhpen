import { MigrationInterface, QueryRunner } from "typeorm";

export class Milestone11693281020837 implements MigrationInterface {
    name = 'Milestone11693281020837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "iam_roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', CONSTRAINT "UQ_7a9e866f17d3e3af13d12be7622" UNIQUE ("key"), CONSTRAINT "PK_aa79b0099c20eed09191e9d4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f0201a16c79111ad493ba62ae0" ON "iam_roles" ("name") `);
        await queryRunner.query(`CREATE TABLE "iam_permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', "module" character varying, "path" character varying NOT NULL, "method" character varying NOT NULL, CONSTRAINT "UQ_9fd8bf0028c36c60271c9dd3d5f" UNIQUE ("key"), CONSTRAINT "PK_647c72677d99c172d9ed329f39c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a3ec9fd351586823854d1ce0fa" ON "iam_permissions" ("name") `);
        await queryRunner.query(`CREATE TABLE "iam_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "gender" character varying, "phone_number" character varying, "address" character varying, "birth_date" TIMESTAMP, "avatar" character varying, "otp" integer, "is_verified" boolean NOT NULL DEFAULT false, "token" character varying, CONSTRAINT "UQ_0692f810e8926469bec26da0d99" UNIQUE ("email"), CONSTRAINT "PK_02086c69f80fed8ae319ec498ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification_categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', CONSTRAINT "UQ_c8a4d58ffd2f6831cf039f45d10" UNIQUE ("key"), CONSTRAINT "PK_b90ee23556ab9be494461474417" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b80b7f9ad48c7dfab0bbc0de5d" ON "notification_categories" ("name") `);
        await queryRunner.query(`CREATE TABLE "notification_templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "title" character varying NOT NULL, "key" character varying, "message" text NOT NULL, "thumbnail" character varying, "category_id" uuid, CONSTRAINT "UQ_8984071929794bfee03a46d2035" UNIQUE ("key"), CONSTRAINT "PK_76f0fc48b8d057d2ae7f3a2848a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fe9f56dbb30bd0b5f7936524a1" ON "notification_templates" ("title") `);
        await queryRunner.query(`CREATE TABLE "notification_pushs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "title" character varying NOT NULL, "is_broadcast" boolean NOT NULL DEFAULT false, "thumbnail" character varying, "message" text NOT NULL, "read_at" TIMESTAMP, "push_at" TIMESTAMP, "category_id" uuid, "user_id" uuid, CONSTRAINT "PK_671ec6b234179018c367b2c7fd4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_10c93184d30820450f9a6103e4" ON "notification_pushs" ("title") `);
        await queryRunner.query(`CREATE TABLE "log_activities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "execute_time_in_ms" integer NOT NULL, "method" character varying NOT NULL, "path" character varying NOT NULL, "remote_address" character varying NOT NULL, "headers" jsonb NOT NULL, "user" jsonb, "body" jsonb, CONSTRAINT "PK_0d8ca6664b12f45d2c86f734c5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "region_provinces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "oid" integer NOT NULL, CONSTRAINT "PK_f37aef0dd93f7bce97063646225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "file_url" character varying NOT NULL, "module" character varying, CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "iam_role_permissions" ("iam_roles_id" uuid NOT NULL, "iam_permissions_id" uuid NOT NULL, CONSTRAINT "PK_2b18c3e99a65f5b6484734cf522" PRIMARY KEY ("iam_roles_id", "iam_permissions_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f61b4ac4eac7446f466a838b7a" ON "iam_role_permissions" ("iam_roles_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_2afc6d3f0deb0f8dab2beface5" ON "iam_role_permissions" ("iam_permissions_id") `);
        await queryRunner.query(`CREATE TABLE "iam_user_roles" ("iam_users_id" uuid NOT NULL, "iam_roles_id" uuid NOT NULL, CONSTRAINT "PK_bfe3bb69fb28ae02c8a49a3bf81" PRIMARY KEY ("iam_users_id", "iam_roles_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fed97036d32bd94497ca13787c" ON "iam_user_roles" ("iam_users_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ce7f5acbb98643ded111969cf" ON "iam_user_roles" ("iam_roles_id") `);
        await queryRunner.query(`CREATE TABLE "notification_push_users" ("notification_pushs_id" uuid NOT NULL, "iam_users_id" uuid NOT NULL, CONSTRAINT "PK_eb499bd159066ceac5f222eb88c" PRIMARY KEY ("notification_pushs_id", "iam_users_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0e3df8ce89c1592ce7c18ab40e" ON "notification_push_users" ("notification_pushs_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_98fb0e14c05f61d0be8d8d9212" ON "notification_push_users" ("iam_users_id") `);
        await queryRunner.query(`ALTER TABLE "notification_templates" ADD CONSTRAINT "FK_5f1a9447b975ccf63387938a29b" FOREIGN KEY ("category_id") REFERENCES "notification_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification_pushs" ADD CONSTRAINT "FK_aca25798979a518fb0d258ad401" FOREIGN KEY ("category_id") REFERENCES "notification_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification_pushs" ADD CONSTRAINT "FK_2581c0fc3d31bc01aad14ffc902" FOREIGN KEY ("user_id") REFERENCES "iam_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "iam_role_permissions" ADD CONSTRAINT "FK_f61b4ac4eac7446f466a838b7a3" FOREIGN KEY ("iam_roles_id") REFERENCES "iam_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "iam_role_permissions" ADD CONSTRAINT "FK_2afc6d3f0deb0f8dab2beface56" FOREIGN KEY ("iam_permissions_id") REFERENCES "iam_permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "iam_user_roles" ADD CONSTRAINT "FK_fed97036d32bd94497ca13787c9" FOREIGN KEY ("iam_users_id") REFERENCES "iam_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "iam_user_roles" ADD CONSTRAINT "FK_4ce7f5acbb98643ded111969cf9" FOREIGN KEY ("iam_roles_id") REFERENCES "iam_roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "notification_push_users" ADD CONSTRAINT "FK_0e3df8ce89c1592ce7c18ab40ed" FOREIGN KEY ("notification_pushs_id") REFERENCES "notification_pushs"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "notification_push_users" ADD CONSTRAINT "FK_98fb0e14c05f61d0be8d8d92127" FOREIGN KEY ("iam_users_id") REFERENCES "iam_users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "notification_push_users" DROP CONSTRAINT "FK_98fb0e14c05f61d0be8d8d92127"`);
        await queryRunner.query(`ALTER TABLE "notification_push_users" DROP CONSTRAINT "FK_0e3df8ce89c1592ce7c18ab40ed"`);
        await queryRunner.query(`ALTER TABLE "iam_user_roles" DROP CONSTRAINT "FK_4ce7f5acbb98643ded111969cf9"`);
        await queryRunner.query(`ALTER TABLE "iam_user_roles" DROP CONSTRAINT "FK_fed97036d32bd94497ca13787c9"`);
        await queryRunner.query(`ALTER TABLE "iam_role_permissions" DROP CONSTRAINT "FK_2afc6d3f0deb0f8dab2beface56"`);
        await queryRunner.query(`ALTER TABLE "iam_role_permissions" DROP CONSTRAINT "FK_f61b4ac4eac7446f466a838b7a3"`);
        await queryRunner.query(`ALTER TABLE "notification_pushs" DROP CONSTRAINT "FK_2581c0fc3d31bc01aad14ffc902"`);
        await queryRunner.query(`ALTER TABLE "notification_pushs" DROP CONSTRAINT "FK_aca25798979a518fb0d258ad401"`);
        await queryRunner.query(`ALTER TABLE "notification_templates" DROP CONSTRAINT "FK_5f1a9447b975ccf63387938a29b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_98fb0e14c05f61d0be8d8d9212"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0e3df8ce89c1592ce7c18ab40e"`);
        await queryRunner.query(`DROP TABLE "notification_push_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ce7f5acbb98643ded111969cf"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fed97036d32bd94497ca13787c"`);
        await queryRunner.query(`DROP TABLE "iam_user_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2afc6d3f0deb0f8dab2beface5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f61b4ac4eac7446f466a838b7a"`);
        await queryRunner.query(`DROP TABLE "iam_role_permissions"`);
        await queryRunner.query(`DROP TABLE "attachments"`);
        await queryRunner.query(`DROP TABLE "region_provinces"`);
        await queryRunner.query(`DROP TABLE "log_activities"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10c93184d30820450f9a6103e4"`);
        await queryRunner.query(`DROP TABLE "notification_pushs"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe9f56dbb30bd0b5f7936524a1"`);
        await queryRunner.query(`DROP TABLE "notification_templates"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b80b7f9ad48c7dfab0bbc0de5d"`);
        await queryRunner.query(`DROP TABLE "notification_categories"`);
        await queryRunner.query(`DROP TABLE "iam_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3ec9fd351586823854d1ce0fa"`);
        await queryRunner.query(`DROP TABLE "iam_permissions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0201a16c79111ad493ba62ae0"`);
        await queryRunner.query(`DROP TABLE "iam_roles"`);
    }

}

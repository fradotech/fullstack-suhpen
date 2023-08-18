import { MigrationInterface, QueryRunner } from "typeorm";

export class Milestone11692359565909 implements MigrationInterface {
    name = 'Milestone11692359565909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "iam_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', CONSTRAINT "UQ_e08c86533eab52ff3c533cedde3" UNIQUE ("key"), CONSTRAINT "PK_33b636232d32fb8e92044503557" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb86fa0242d715b491b1412595" ON "iam_role" ("name") `);
        await queryRunner.query(`CREATE TABLE "iam_permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', "module" character varying, "path" character varying NOT NULL, "method" character varying NOT NULL, CONSTRAINT "UQ_79f1daf6f6a841715c976f0c449" UNIQUE ("key"), CONSTRAINT "PK_b9b2b1ce474fac00055efe16526" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e596881e4335128fa9926852dd" ON "iam_permission" ("name") `);
        await queryRunner.query(`CREATE TABLE "iam_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "gender" character varying, "phone_number" character varying, "address" character varying, "birth_date" TIMESTAMP, "avatar" character varying, "otp" integer, "is_verified" boolean NOT NULL DEFAULT false, "token" character varying, CONSTRAINT "UQ_11cb18a0c5213e2f0e6b4bd8c70" UNIQUE ("email"), CONSTRAINT "PK_1dce953388a63ca32d8e2c3f1f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', CONSTRAINT "UQ_b135ec6ba7b608003c04c45f8c1" UNIQUE ("key"), CONSTRAINT "PK_1c1ca42fa0d288c36d739c36e7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c4af04f23e4226292373e92038" ON "notification_category" ("name") `);
        await queryRunner.query(`CREATE TABLE "notification_push" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "title" character varying NOT NULL, "is_broadcast" boolean NOT NULL DEFAULT false, "thumbnail" character varying, "message" text NOT NULL, "read_at" TIMESTAMP, "push_at" TIMESTAMP, "category_id" uuid, "user_id" uuid, CONSTRAINT "PK_0755c4aeb3a6032eb0a0d8c86f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dffe9b4a3cf32b6b8cd1fcc6a3" ON "notification_push" ("title") `);
        await queryRunner.query(`CREATE TABLE "notification_template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "title" character varying NOT NULL, "key" character varying, "message" text NOT NULL, "thumbnail" character varying, "category_id" uuid, CONSTRAINT "UQ_fffe693f6dd5d87a447f04b9036" UNIQUE ("key"), CONSTRAINT "PK_d2a6ef77141a01b8ac31f514cfc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8726d12455973b91cf82612915" ON "notification_template" ("title") `);
        await queryRunner.query(`CREATE TABLE "attachment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "file_url" character varying NOT NULL, "module" character varying, CONSTRAINT "PK_d2a80c3a8d467f08a750ac4b420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "iam_role_permissions" ("iam_role_id" uuid NOT NULL, "iam_permission_id" uuid NOT NULL, CONSTRAINT "PK_814925000d0929090c124cbc739" PRIMARY KEY ("iam_role_id", "iam_permission_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2a554da12d2c907e844b29067e" ON "iam_role_permissions" ("iam_role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_834809ec9086f949baaf743206" ON "iam_role_permissions" ("iam_permission_id") `);
        await queryRunner.query(`CREATE TABLE "iam_user_roles" ("iam_user_id" uuid NOT NULL, "iam_role_id" uuid NOT NULL, CONSTRAINT "PK_c85a02b8c4e8fdcbdca52c62497" PRIMARY KEY ("iam_user_id", "iam_role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e8e13f7a38ed48da07ec14afc2" ON "iam_user_roles" ("iam_user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f97a134771538c09b9e63d15f" ON "iam_user_roles" ("iam_role_id") `);
        await queryRunner.query(`CREATE TABLE "notification_push_users" ("notification_push_id" uuid NOT NULL, "iam_user_id" uuid NOT NULL, CONSTRAINT "PK_75d7623f859996694bad4cb24b5" PRIMARY KEY ("notification_push_id", "iam_user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f9df18c2d74ae04e2e812fe631" ON "notification_push_users" ("notification_push_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1512e8560a4d51bb17e6fa2098" ON "notification_push_users" ("iam_user_id") `);
        await queryRunner.query(`ALTER TABLE "notification_push" ADD CONSTRAINT "FK_dec9382104fdf709234310a0f1c" FOREIGN KEY ("category_id") REFERENCES "notification_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification_push" ADD CONSTRAINT "FK_60d51271bc440754b8dc5e2b618" FOREIGN KEY ("user_id") REFERENCES "iam_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification_template" ADD CONSTRAINT "FK_98c8cb5f6218df95819d8cd4bae" FOREIGN KEY ("category_id") REFERENCES "notification_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "iam_role_permissions" ADD CONSTRAINT "FK_2a554da12d2c907e844b29067ef" FOREIGN KEY ("iam_role_id") REFERENCES "iam_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "iam_role_permissions" ADD CONSTRAINT "FK_834809ec9086f949baaf7432062" FOREIGN KEY ("iam_permission_id") REFERENCES "iam_permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "iam_user_roles" ADD CONSTRAINT "FK_e8e13f7a38ed48da07ec14afc28" FOREIGN KEY ("iam_user_id") REFERENCES "iam_user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "iam_user_roles" ADD CONSTRAINT "FK_3f97a134771538c09b9e63d15f5" FOREIGN KEY ("iam_role_id") REFERENCES "iam_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "notification_push_users" ADD CONSTRAINT "FK_f9df18c2d74ae04e2e812fe631a" FOREIGN KEY ("notification_push_id") REFERENCES "notification_push"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "notification_push_users" ADD CONSTRAINT "FK_1512e8560a4d51bb17e6fa20986" FOREIGN KEY ("iam_user_id") REFERENCES "iam_user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "notification_push_users" DROP CONSTRAINT "FK_1512e8560a4d51bb17e6fa20986"`);
        await queryRunner.query(`ALTER TABLE "notification_push_users" DROP CONSTRAINT "FK_f9df18c2d74ae04e2e812fe631a"`);
        await queryRunner.query(`ALTER TABLE "iam_user_roles" DROP CONSTRAINT "FK_3f97a134771538c09b9e63d15f5"`);
        await queryRunner.query(`ALTER TABLE "iam_user_roles" DROP CONSTRAINT "FK_e8e13f7a38ed48da07ec14afc28"`);
        await queryRunner.query(`ALTER TABLE "iam_role_permissions" DROP CONSTRAINT "FK_834809ec9086f949baaf7432062"`);
        await queryRunner.query(`ALTER TABLE "iam_role_permissions" DROP CONSTRAINT "FK_2a554da12d2c907e844b29067ef"`);
        await queryRunner.query(`ALTER TABLE "notification_template" DROP CONSTRAINT "FK_98c8cb5f6218df95819d8cd4bae"`);
        await queryRunner.query(`ALTER TABLE "notification_push" DROP CONSTRAINT "FK_60d51271bc440754b8dc5e2b618"`);
        await queryRunner.query(`ALTER TABLE "notification_push" DROP CONSTRAINT "FK_dec9382104fdf709234310a0f1c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1512e8560a4d51bb17e6fa2098"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f9df18c2d74ae04e2e812fe631"`);
        await queryRunner.query(`DROP TABLE "notification_push_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f97a134771538c09b9e63d15f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8e13f7a38ed48da07ec14afc2"`);
        await queryRunner.query(`DROP TABLE "iam_user_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_834809ec9086f949baaf743206"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a554da12d2c907e844b29067e"`);
        await queryRunner.query(`DROP TABLE "iam_role_permissions"`);
        await queryRunner.query(`DROP TABLE "attachment"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8726d12455973b91cf82612915"`);
        await queryRunner.query(`DROP TABLE "notification_template"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dffe9b4a3cf32b6b8cd1fcc6a3"`);
        await queryRunner.query(`DROP TABLE "notification_push"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4af04f23e4226292373e92038"`);
        await queryRunner.query(`DROP TABLE "notification_category"`);
        await queryRunner.query(`DROP TABLE "iam_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e596881e4335128fa9926852dd"`);
        await queryRunner.query(`DROP TABLE "iam_permission"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb86fa0242d715b491b1412595"`);
        await queryRunner.query(`DROP TABLE "iam_role"`);
    }

}

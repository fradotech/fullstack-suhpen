import { MigrationInterface, QueryRunner } from "typeorm";

export class Milestone11690452129476 implements MigrationInterface {
    name = 'Milestone11690452129476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ent_permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', "module" character varying, "path" character varying NOT NULL, "method" character varying NOT NULL, CONSTRAINT "UQ_7354474dc2190753628409bcbfd" UNIQUE ("key"), CONSTRAINT "PK_8871af6236545bb6220756a9231" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a4eda1a807235b70e913db573b" ON "ent_permission" ("name") `);
        await queryRunner.query(`CREATE TABLE "ent_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', CONSTRAINT "UQ_789f01960a1f8a14787d40dd006" UNIQUE ("key"), CONSTRAINT "PK_0e9fcb03233811bb72fbe362ee7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cd5ae51468329747e172efaf88" ON "ent_role" ("name") `);
        await queryRunner.query(`CREATE TABLE "ent_notification_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', CONSTRAINT "UQ_b09be5cc9e5a823e5089852bdf2" UNIQUE ("key"), CONSTRAINT "PK_ca06fa338071a23be1d852d7538" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_06483357b47bfba6f546fa7cd6" ON "ent_notification_category" ("name") `);
        await queryRunner.query(`CREATE TABLE "ent_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "gender" character varying, "phone_number" character varying, "address" character varying, "birth_date" TIMESTAMP, "avatar" character varying, "otp" integer, "is_verified" boolean NOT NULL DEFAULT false, "token" character varying, CONSTRAINT "UQ_bb1fa9f7df3299e82ef270c91f6" UNIQUE ("email"), CONSTRAINT "PK_31554b950f0d538a9f15e10422e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ent_notification_template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "title" character varying NOT NULL, "message" text NOT NULL, "thumbnail" character varying, "category_id" uuid, CONSTRAINT "PK_7bf6062ba6d66ab4784008c6d53" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_de55eb54546b62afa2111deb5c" ON "ent_notification_template" ("title") `);
        await queryRunner.query(`CREATE TABLE "ent_push_notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "title" character varying NOT NULL, "is_broadcast" boolean NOT NULL DEFAULT false, "thumbnail" character varying, "message" text NOT NULL, "read_at" TIMESTAMP, "push_at" TIMESTAMP, "category_id" uuid, "user_id" uuid, CONSTRAINT "PK_697601c707b508402e179188f0c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cfd3c067a22580c13afe9f6037" ON "ent_push_notification" ("title") `);
        await queryRunner.query(`CREATE INDEX "IDX_84c5875ac16856236be4aed2f3" ON "ent_push_notification" ("push_at") `);
        await queryRunner.query(`CREATE TABLE "ent_attachment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "file_url" character varying NOT NULL, "module" character varying, CONSTRAINT "PK_f2f540d480454bc574bbee67766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ent_role_permissions" ("ent_permission_id" uuid NOT NULL, "ent_role_id" uuid NOT NULL, CONSTRAINT "PK_b22215faed5521d3efd191274c0" PRIMARY KEY ("ent_permission_id", "ent_role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d07ee46e98cdf492a606fc7cc3" ON "ent_role_permissions" ("ent_permission_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6ecf96fe4954b21b1cee75fe5b" ON "ent_role_permissions" ("ent_role_id") `);
        await queryRunner.query(`CREATE TABLE "ent_user_roles" ("ent_user_id" uuid NOT NULL, "ent_role_id" uuid NOT NULL, CONSTRAINT "PK_2fed87846eec0d595267e5e31e9" PRIMARY KEY ("ent_user_id", "ent_role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_25ee6c359ab49e2b4b50206765" ON "ent_user_roles" ("ent_user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_606c8fc940ee34eef7bca090ef" ON "ent_user_roles" ("ent_role_id") `);
        await queryRunner.query(`CREATE TABLE "ent_notification_read_users" ("ent_push_notification_id" uuid NOT NULL, "ent_user_id" uuid NOT NULL, CONSTRAINT "PK_70d5fc2766e15c0b822f196b6e0" PRIMARY KEY ("ent_push_notification_id", "ent_user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ee13048f93d428819f18853e26" ON "ent_notification_read_users" ("ent_push_notification_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_718f9b307ceb9b8ac7126dba4b" ON "ent_notification_read_users" ("ent_user_id") `);
        await queryRunner.query(`ALTER TABLE "ent_notification_template" ADD CONSTRAINT "FK_162e5fbacdd6b9b5461f184e6ee" FOREIGN KEY ("category_id") REFERENCES "ent_notification_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ent_push_notification" ADD CONSTRAINT "FK_bb7624f63e443dd90f069b4aaef" FOREIGN KEY ("category_id") REFERENCES "ent_notification_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ent_push_notification" ADD CONSTRAINT "FK_baf0551e32e672a6dc6f1615cf7" FOREIGN KEY ("user_id") REFERENCES "ent_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ent_role_permissions" ADD CONSTRAINT "FK_d07ee46e98cdf492a606fc7cc35" FOREIGN KEY ("ent_permission_id") REFERENCES "ent_permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ent_role_permissions" ADD CONSTRAINT "FK_6ecf96fe4954b21b1cee75fe5b1" FOREIGN KEY ("ent_role_id") REFERENCES "ent_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ent_user_roles" ADD CONSTRAINT "FK_25ee6c359ab49e2b4b50206765f" FOREIGN KEY ("ent_user_id") REFERENCES "ent_user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ent_user_roles" ADD CONSTRAINT "FK_606c8fc940ee34eef7bca090efd" FOREIGN KEY ("ent_role_id") REFERENCES "ent_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ent_notification_read_users" ADD CONSTRAINT "FK_ee13048f93d428819f18853e26d" FOREIGN KEY ("ent_push_notification_id") REFERENCES "ent_push_notification"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ent_notification_read_users" ADD CONSTRAINT "FK_718f9b307ceb9b8ac7126dba4bf" FOREIGN KEY ("ent_user_id") REFERENCES "ent_user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "ent_notification_read_users" DROP CONSTRAINT "FK_718f9b307ceb9b8ac7126dba4bf"`);
        await queryRunner.query(`ALTER TABLE "ent_notification_read_users" DROP CONSTRAINT "FK_ee13048f93d428819f18853e26d"`);
        await queryRunner.query(`ALTER TABLE "ent_user_roles" DROP CONSTRAINT "FK_606c8fc940ee34eef7bca090efd"`);
        await queryRunner.query(`ALTER TABLE "ent_user_roles" DROP CONSTRAINT "FK_25ee6c359ab49e2b4b50206765f"`);
        await queryRunner.query(`ALTER TABLE "ent_role_permissions" DROP CONSTRAINT "FK_6ecf96fe4954b21b1cee75fe5b1"`);
        await queryRunner.query(`ALTER TABLE "ent_role_permissions" DROP CONSTRAINT "FK_d07ee46e98cdf492a606fc7cc35"`);
        await queryRunner.query(`ALTER TABLE "ent_push_notification" DROP CONSTRAINT "FK_baf0551e32e672a6dc6f1615cf7"`);
        await queryRunner.query(`ALTER TABLE "ent_push_notification" DROP CONSTRAINT "FK_bb7624f63e443dd90f069b4aaef"`);
        await queryRunner.query(`ALTER TABLE "ent_notification_template" DROP CONSTRAINT "FK_162e5fbacdd6b9b5461f184e6ee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_718f9b307ceb9b8ac7126dba4b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee13048f93d428819f18853e26"`);
        await queryRunner.query(`DROP TABLE "ent_notification_read_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_606c8fc940ee34eef7bca090ef"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25ee6c359ab49e2b4b50206765"`);
        await queryRunner.query(`DROP TABLE "ent_user_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ecf96fe4954b21b1cee75fe5b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d07ee46e98cdf492a606fc7cc3"`);
        await queryRunner.query(`DROP TABLE "ent_role_permissions"`);
        await queryRunner.query(`DROP TABLE "ent_attachment"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_84c5875ac16856236be4aed2f3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cfd3c067a22580c13afe9f6037"`);
        await queryRunner.query(`DROP TABLE "ent_push_notification"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_de55eb54546b62afa2111deb5c"`);
        await queryRunner.query(`DROP TABLE "ent_notification_template"`);
        await queryRunner.query(`DROP TABLE "ent_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_06483357b47bfba6f546fa7cd6"`);
        await queryRunner.query(`DROP TABLE "ent_notification_category"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd5ae51468329747e172efaf88"`);
        await queryRunner.query(`DROP TABLE "ent_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a4eda1a807235b70e913db573b"`);
        await queryRunner.query(`DROP TABLE "ent_permission"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Milestone11689258756738 implements MigrationInterface {
    name = 'Milestone11689258756738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ent_permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', "module" character varying, "path" character varying NOT NULL, "method" character varying NOT NULL, CONSTRAINT "UQ_7354474dc2190753628409bcbfd" UNIQUE ("key"), CONSTRAINT "PK_8871af6236545bb6220756a9231" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a4eda1a807235b70e913db573b" ON "ent_permission" ("name") `);
        await queryRunner.query(`CREATE TABLE "ent_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', CONSTRAINT "UQ_789f01960a1f8a14787d40dd006" UNIQUE ("key"), CONSTRAINT "PK_0e9fcb03233811bb72fbe362ee7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cd5ae51468329747e172efaf88" ON "ent_role" ("name") `);
        await queryRunner.query(`CREATE TABLE "ent_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "gender" character varying, "phone_number" character varying, "address" character varying, "birth_date" TIMESTAMP, "avatar" character varying, "otp" integer, "is_verified" boolean NOT NULL DEFAULT false, "token" character varying, CONSTRAINT "UQ_bb1fa9f7df3299e82ef270c91f6" UNIQUE ("email"), CONSTRAINT "PK_31554b950f0d538a9f15e10422e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ent_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', "parent_id" uuid, CONSTRAINT "UQ_55dd988b4138774afae46aa7a5b" UNIQUE ("key"), CONSTRAINT "PK_4d15d2cb5ca54d17484303c107d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_038ced7825f2927caea6468c0b" ON "ent_category" ("name") `);
        await queryRunner.query(`CREATE TABLE "ent_variant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "sku" character varying, "name" character varying, "supply_type" character varying NOT NULL DEFAULT 'SELF_STOCK', "buy_price" integer NOT NULL DEFAULT '0', "sell_price" integer NOT NULL DEFAULT '0', "margin_price" integer NOT NULL DEFAULT '0', "stock" integer NOT NULL DEFAULT '0', "stock_minimum" integer, "discount_percentage" integer NOT NULL DEFAULT '0', "expired_date" TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, "thumbnail" character varying, "product_id" uuid, CONSTRAINT "UQ_a5e2e5e43a747db0210e244ef0d" UNIQUE ("sku"), CONSTRAINT "PK_9e87ac942203a77d3e3be681b50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ent_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "name" character varying NOT NULL, "key" character varying, "is_active" boolean NOT NULL DEFAULT true, "description" text, "thumbnail" character varying, "label_color" character varying NOT NULL DEFAULT '#007fd0', "upc" character varying, "brand" character varying, "rating" character varying, "parent_id" uuid, CONSTRAINT "UQ_1e29417c55c2cfd8fa9c8858d7f" UNIQUE ("key"), CONSTRAINT "UQ_d722ac2c15d80dbf90af454ddc9" UNIQUE ("upc"), CONSTRAINT "PK_f9ac7468ade2ce439d216d36171" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_433e6648eb889b83cd5bb70bf6" ON "ent_product" ("name") `);
        await queryRunner.query(`CREATE TABLE "ent_attachment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" uuid, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" uuid, "deleted_at" TIMESTAMP, "deleted_by_id" uuid, "file_url" character varying NOT NULL, "module" character varying, CONSTRAINT "PK_f2f540d480454bc574bbee67766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ent_role_permissions" ("ent_permission_id" uuid NOT NULL, "ent_role_id" uuid NOT NULL, CONSTRAINT "PK_b22215faed5521d3efd191274c0" PRIMARY KEY ("ent_permission_id", "ent_role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d07ee46e98cdf492a606fc7cc3" ON "ent_role_permissions" ("ent_permission_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_6ecf96fe4954b21b1cee75fe5b" ON "ent_role_permissions" ("ent_role_id") `);
        await queryRunner.query(`CREATE TABLE "ent_user_roles" ("ent_user_id" uuid NOT NULL, "ent_role_id" uuid NOT NULL, CONSTRAINT "PK_2fed87846eec0d595267e5e31e9" PRIMARY KEY ("ent_user_id", "ent_role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_25ee6c359ab49e2b4b50206765" ON "ent_user_roles" ("ent_user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_606c8fc940ee34eef7bca090ef" ON "ent_user_roles" ("ent_role_id") `);
        await queryRunner.query(`CREATE TABLE "ent_product_categories" ("ent_product_id" uuid NOT NULL, "ent_category_id" uuid NOT NULL, CONSTRAINT "PK_5527317a89b1e3c91b12b50ba9d" PRIMARY KEY ("ent_product_id", "ent_category_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a301797e3bc01a0760e806eb89" ON "ent_product_categories" ("ent_product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1176d66fdd104f54f32917a0ba" ON "ent_product_categories" ("ent_category_id") `);
        await queryRunner.query(`ALTER TABLE "ent_category" ADD CONSTRAINT "FK_3c8cf163a87b9e099947fc66de2" FOREIGN KEY ("parent_id") REFERENCES "ent_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ent_variant" ADD CONSTRAINT "FK_97a1b202feaad1b731263a71313" FOREIGN KEY ("product_id") REFERENCES "ent_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ent_product" ADD CONSTRAINT "FK_ed09acddbb99f2c378debf006b7" FOREIGN KEY ("parent_id") REFERENCES "ent_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ent_role_permissions" ADD CONSTRAINT "FK_d07ee46e98cdf492a606fc7cc35" FOREIGN KEY ("ent_permission_id") REFERENCES "ent_permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ent_role_permissions" ADD CONSTRAINT "FK_6ecf96fe4954b21b1cee75fe5b1" FOREIGN KEY ("ent_role_id") REFERENCES "ent_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ent_user_roles" ADD CONSTRAINT "FK_25ee6c359ab49e2b4b50206765f" FOREIGN KEY ("ent_user_id") REFERENCES "ent_user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ent_user_roles" ADD CONSTRAINT "FK_606c8fc940ee34eef7bca090efd" FOREIGN KEY ("ent_role_id") REFERENCES "ent_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ent_product_categories" ADD CONSTRAINT "FK_a301797e3bc01a0760e806eb89d" FOREIGN KEY ("ent_product_id") REFERENCES "ent_product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "ent_product_categories" ADD CONSTRAINT "FK_1176d66fdd104f54f32917a0ba0" FOREIGN KEY ("ent_category_id") REFERENCES "ent_category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ent_product_categories" DROP CONSTRAINT "FK_1176d66fdd104f54f32917a0ba0"`);
        await queryRunner.query(`ALTER TABLE "ent_product_categories" DROP CONSTRAINT "FK_a301797e3bc01a0760e806eb89d"`);
        await queryRunner.query(`ALTER TABLE "ent_user_roles" DROP CONSTRAINT "FK_606c8fc940ee34eef7bca090efd"`);
        await queryRunner.query(`ALTER TABLE "ent_user_roles" DROP CONSTRAINT "FK_25ee6c359ab49e2b4b50206765f"`);
        await queryRunner.query(`ALTER TABLE "ent_role_permissions" DROP CONSTRAINT "FK_6ecf96fe4954b21b1cee75fe5b1"`);
        await queryRunner.query(`ALTER TABLE "ent_role_permissions" DROP CONSTRAINT "FK_d07ee46e98cdf492a606fc7cc35"`);
        await queryRunner.query(`ALTER TABLE "ent_product" DROP CONSTRAINT "FK_ed09acddbb99f2c378debf006b7"`);
        await queryRunner.query(`ALTER TABLE "ent_variant" DROP CONSTRAINT "FK_97a1b202feaad1b731263a71313"`);
        await queryRunner.query(`ALTER TABLE "ent_category" DROP CONSTRAINT "FK_3c8cf163a87b9e099947fc66de2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1176d66fdd104f54f32917a0ba"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a301797e3bc01a0760e806eb89"`);
        await queryRunner.query(`DROP TABLE "ent_product_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_606c8fc940ee34eef7bca090ef"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25ee6c359ab49e2b4b50206765"`);
        await queryRunner.query(`DROP TABLE "ent_user_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ecf96fe4954b21b1cee75fe5b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d07ee46e98cdf492a606fc7cc3"`);
        await queryRunner.query(`DROP TABLE "ent_role_permissions"`);
        await queryRunner.query(`DROP TABLE "ent_attachment"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_433e6648eb889b83cd5bb70bf6"`);
        await queryRunner.query(`DROP TABLE "ent_product"`);
        await queryRunner.query(`DROP TABLE "ent_variant"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_038ced7825f2927caea6468c0b"`);
        await queryRunner.query(`DROP TABLE "ent_category"`);
        await queryRunner.query(`DROP TABLE "ent_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd5ae51468329747e172efaf88"`);
        await queryRunner.query(`DROP TABLE "ent_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a4eda1a807235b70e913db573b"`);
        await queryRunner.query(`DROP TABLE "ent_permission"`);
    }

}

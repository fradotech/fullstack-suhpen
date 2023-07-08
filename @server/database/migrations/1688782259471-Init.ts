import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1688782259471 implements MigrationInterface {
    name = 'Init1688782259471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ent_category\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by_id\` varchar(255) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by_id\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`deleted_by_id\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`description\` text NULL, \`thumbnail\` varchar(255) NULL, \`label_color\` varchar(255) NOT NULL DEFAULT '#007fd0', \`parent_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_55dd988b4138774afae46aa7a5\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_inventory\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by_id\` varchar(255) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by_id\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`deleted_by_id\` varchar(255) NULL, \`sku\` varchar(255) NULL, \`variant\` varchar(255) NULL, \`supply_type\` varchar(255) NOT NULL DEFAULT 'Self Stock', \`buy_price\` int NOT NULL DEFAULT '0', \`sell_price\` int NOT NULL DEFAULT '0', \`margin_price\` int NOT NULL DEFAULT '0', \`stock\` int NOT NULL DEFAULT '0', \`stock_minimum\` int NULL, \`discount_percentage\` int NOT NULL DEFAULT '0', \`expired_date\` datetime NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`thumbnail\` varchar(255) NULL, \`product_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_8bdc043871831e7e679e8af005\` (\`sku\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_product\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by_id\` varchar(255) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by_id\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`deleted_by_id\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`description\` text NULL, \`thumbnail\` varchar(255) NULL, \`label_color\` varchar(255) NOT NULL DEFAULT '#007fd0', \`upc\` varchar(255) NULL, \`brand\` varchar(255) NULL, \`rating\` varchar(255) NULL, \`parent_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_1e29417c55c2cfd8fa9c8858d7\` (\`key\`), UNIQUE INDEX \`IDX_d722ac2c15d80dbf90af454ddc\` (\`upc\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_role\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by_id\` varchar(255) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by_id\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`deleted_by_id\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`description\` text NULL, \`thumbnail\` varchar(255) NULL, \`label_color\` varchar(255) NOT NULL DEFAULT '#007fd0', UNIQUE INDEX \`IDX_789f01960a1f8a14787d40dd00\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_permission\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by_id\` varchar(255) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by_id\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`deleted_by_id\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`description\` text NULL, \`thumbnail\` varchar(255) NULL, \`label_color\` varchar(255) NOT NULL DEFAULT '#007fd0', \`module\` varchar(255) NULL, \`path\` varchar(255) NOT NULL, \`method\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_7354474dc2190753628409bcbf\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_user\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by_id\` varchar(255) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by_id\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`deleted_by_id\` varchar(255) NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`gender\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`address\` varchar(255) NULL, \`birth_date\` datetime NULL, \`avatar\` varchar(255) NULL, \`otp\` int NULL, \`is_verified\` tinyint NOT NULL DEFAULT 0, \`token\` varchar(255) NULL, UNIQUE INDEX \`IDX_bb1fa9f7df3299e82ef270c91f\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_attachment\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by_id\` varchar(255) NULL, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by_id\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL, \`deleted_by_id\` varchar(255) NULL, \`file_url\` varchar(255) NOT NULL, \`module\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_product_categories\` (\`ent_product_id\` varchar(36) NOT NULL, \`ent_category_id\` varchar(36) NOT NULL, INDEX \`IDX_a301797e3bc01a0760e806eb89\` (\`ent_product_id\`), INDEX \`IDX_1176d66fdd104f54f32917a0ba\` (\`ent_category_id\`), PRIMARY KEY (\`ent_product_id\`, \`ent_category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_role_permissions\` (\`ent_role_id\` varchar(36) NOT NULL, \`ent_permission_id\` varchar(36) NOT NULL, INDEX \`IDX_6ecf96fe4954b21b1cee75fe5b\` (\`ent_role_id\`), INDEX \`IDX_d07ee46e98cdf492a606fc7cc3\` (\`ent_permission_id\`), PRIMARY KEY (\`ent_role_id\`, \`ent_permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_user_roles\` (\`ent_user_id\` varchar(36) NOT NULL, \`ent_role_id\` varchar(36) NOT NULL, INDEX \`IDX_25ee6c359ab49e2b4b50206765\` (\`ent_user_id\`), INDEX \`IDX_606c8fc940ee34eef7bca090ef\` (\`ent_role_id\`), PRIMARY KEY (\`ent_user_id\`, \`ent_role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ent_category\` ADD CONSTRAINT \`FK_3c8cf163a87b9e099947fc66de2\` FOREIGN KEY (\`parent_id\`) REFERENCES \`ent_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_inventory\` ADD CONSTRAINT \`FK_70e3a6b7fcd07c80a2472f8f3b4\` FOREIGN KEY (\`product_id\`) REFERENCES \`ent_product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_product\` ADD CONSTRAINT \`FK_ed09acddbb99f2c378debf006b7\` FOREIGN KEY (\`parent_id\`) REFERENCES \`ent_product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_product_categories\` ADD CONSTRAINT \`FK_a301797e3bc01a0760e806eb89d\` FOREIGN KEY (\`ent_product_id\`) REFERENCES \`ent_product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ent_product_categories\` ADD CONSTRAINT \`FK_1176d66fdd104f54f32917a0ba0\` FOREIGN KEY (\`ent_category_id\`) REFERENCES \`ent_category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ent_role_permissions\` ADD CONSTRAINT \`FK_6ecf96fe4954b21b1cee75fe5b1\` FOREIGN KEY (\`ent_role_id\`) REFERENCES \`ent_role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ent_role_permissions\` ADD CONSTRAINT \`FK_d07ee46e98cdf492a606fc7cc35\` FOREIGN KEY (\`ent_permission_id\`) REFERENCES \`ent_permission\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ent_user_roles\` ADD CONSTRAINT \`FK_25ee6c359ab49e2b4b50206765f\` FOREIGN KEY (\`ent_user_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ent_user_roles\` ADD CONSTRAINT \`FK_606c8fc940ee34eef7bca090efd\` FOREIGN KEY (\`ent_role_id\`) REFERENCES \`ent_role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ent_user_roles\` DROP FOREIGN KEY \`FK_606c8fc940ee34eef7bca090efd\``);
        await queryRunner.query(`ALTER TABLE \`ent_user_roles\` DROP FOREIGN KEY \`FK_25ee6c359ab49e2b4b50206765f\``);
        await queryRunner.query(`ALTER TABLE \`ent_role_permissions\` DROP FOREIGN KEY \`FK_d07ee46e98cdf492a606fc7cc35\``);
        await queryRunner.query(`ALTER TABLE \`ent_role_permissions\` DROP FOREIGN KEY \`FK_6ecf96fe4954b21b1cee75fe5b1\``);
        await queryRunner.query(`ALTER TABLE \`ent_product_categories\` DROP FOREIGN KEY \`FK_1176d66fdd104f54f32917a0ba0\``);
        await queryRunner.query(`ALTER TABLE \`ent_product_categories\` DROP FOREIGN KEY \`FK_a301797e3bc01a0760e806eb89d\``);
        await queryRunner.query(`ALTER TABLE \`ent_product\` DROP FOREIGN KEY \`FK_ed09acddbb99f2c378debf006b7\``);
        await queryRunner.query(`ALTER TABLE \`ent_inventory\` DROP FOREIGN KEY \`FK_70e3a6b7fcd07c80a2472f8f3b4\``);
        await queryRunner.query(`ALTER TABLE \`ent_category\` DROP FOREIGN KEY \`FK_3c8cf163a87b9e099947fc66de2\``);
        await queryRunner.query(`DROP INDEX \`IDX_606c8fc940ee34eef7bca090ef\` ON \`ent_user_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_25ee6c359ab49e2b4b50206765\` ON \`ent_user_roles\``);
        await queryRunner.query(`DROP TABLE \`ent_user_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_d07ee46e98cdf492a606fc7cc3\` ON \`ent_role_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_6ecf96fe4954b21b1cee75fe5b\` ON \`ent_role_permissions\``);
        await queryRunner.query(`DROP TABLE \`ent_role_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_1176d66fdd104f54f32917a0ba\` ON \`ent_product_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_a301797e3bc01a0760e806eb89\` ON \`ent_product_categories\``);
        await queryRunner.query(`DROP TABLE \`ent_product_categories\``);
        await queryRunner.query(`DROP TABLE \`ent_attachment\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb1fa9f7df3299e82ef270c91f\` ON \`ent_user\``);
        await queryRunner.query(`DROP TABLE \`ent_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_7354474dc2190753628409bcbf\` ON \`ent_permission\``);
        await queryRunner.query(`DROP TABLE \`ent_permission\``);
        await queryRunner.query(`DROP INDEX \`IDX_789f01960a1f8a14787d40dd00\` ON \`ent_role\``);
        await queryRunner.query(`DROP TABLE \`ent_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_d722ac2c15d80dbf90af454ddc\` ON \`ent_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_1e29417c55c2cfd8fa9c8858d7\` ON \`ent_product\``);
        await queryRunner.query(`DROP TABLE \`ent_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_8bdc043871831e7e679e8af005\` ON \`ent_inventory\``);
        await queryRunner.query(`DROP TABLE \`ent_inventory\``);
        await queryRunner.query(`DROP INDEX \`IDX_55dd988b4138774afae46aa7a5\` ON \`ent_category\``);
        await queryRunner.query(`DROP TABLE \`ent_category\``);
    }

}

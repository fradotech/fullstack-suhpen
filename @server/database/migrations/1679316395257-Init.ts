import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1679316395257 implements MigrationInterface {
    name = 'Init1679316395257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ent_user\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('Administrator', 'AdminSecond', 'User') NOT NULL DEFAULT 'User', \`gender\` enum ('Man', 'Woman') NULL, \`phone_number\` varchar(255) NULL, \`address\` varchar(255) NULL, \`birth_date\` datetime NULL, \`avatar\` varchar(255) NULL, \`otp\` int NULL, \`is_verified\` tinyint NOT NULL DEFAULT 0, \`token\` varchar(255) NULL, \`start_at\` datetime NULL, \`end_at\` datetime NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, \`deleted_by_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_bb1fa9f7df3299e82ef270c91f\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_category\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`description\` text NULL, \`thumbnail\` varchar(255) NULL, \`label_color\` varchar(255) NOT NULL DEFAULT '#ffffff', \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, \`deleted_by_id\` varchar(36) NULL, \`parent_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_55dd988b4138774afae46aa7a5\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_attachment\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_url\` varchar(255) NOT NULL, \`module\` varchar(255) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, \`deleted_by_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_product\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`description\` text NULL, \`thumbnail\` varchar(255) NULL, \`sku\` varchar(255) NULL, \`stock\` int NOT NULL, \`buy_price\` int NOT NULL DEFAULT '0', \`sell_price\` int NOT NULL DEFAULT '0', \`margin_price\` int NOT NULL DEFAULT '0', \`discount_percentage\` int NOT NULL DEFAULT '0', \`brand\` varchar(255) NULL, \`rating\` varchar(255) NULL, \`expired_date\` datetime NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, \`deleted_by_id\` varchar(36) NULL, \`parent_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_1e29417c55c2cfd8fa9c8858d7\` (\`key\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ent_product_categories\` (\`ent_product_id\` varchar(36) NOT NULL, \`ent_category_id\` varchar(36) NOT NULL, INDEX \`IDX_a301797e3bc01a0760e806eb89\` (\`ent_product_id\`), INDEX \`IDX_1176d66fdd104f54f32917a0ba\` (\`ent_category_id\`), PRIMARY KEY (\`ent_product_id\`, \`ent_category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ent_user\` ADD CONSTRAINT \`FK_5aa6123805d0c686749917371a9\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_user\` ADD CONSTRAINT \`FK_805aaea46df8caeefa0c957d983\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_user\` ADD CONSTRAINT \`FK_b11b30be03b4bb47a637b4c2e64\` FOREIGN KEY (\`deleted_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_category\` ADD CONSTRAINT \`FK_8d527f821b6eed06179894f0d5e\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_category\` ADD CONSTRAINT \`FK_1b3477a75857145a0ce4806d747\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_category\` ADD CONSTRAINT \`FK_55d4c31466635d79546c54bc121\` FOREIGN KEY (\`deleted_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_category\` ADD CONSTRAINT \`FK_3c8cf163a87b9e099947fc66de2\` FOREIGN KEY (\`parent_id\`) REFERENCES \`ent_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_attachment\` ADD CONSTRAINT \`FK_1640cad91449dfd5a9a1baa3a3b\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_attachment\` ADD CONSTRAINT \`FK_c07258fcadd6cd6ce50f5a2b763\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_attachment\` ADD CONSTRAINT \`FK_a040131cfca8aac239280265848\` FOREIGN KEY (\`deleted_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_product\` ADD CONSTRAINT \`FK_aca2dc03934bd8111818179701c\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_product\` ADD CONSTRAINT \`FK_0766ed11654e02e44fd674386de\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_product\` ADD CONSTRAINT \`FK_f23815ed982b2d9e9c63b111429\` FOREIGN KEY (\`deleted_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_product\` ADD CONSTRAINT \`FK_ed09acddbb99f2c378debf006b7\` FOREIGN KEY (\`parent_id\`) REFERENCES \`ent_product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`ent_product_categories\` ADD CONSTRAINT \`FK_a301797e3bc01a0760e806eb89d\` FOREIGN KEY (\`ent_product_id\`) REFERENCES \`ent_product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`ent_product_categories\` ADD CONSTRAINT \`FK_1176d66fdd104f54f32917a0ba0\` FOREIGN KEY (\`ent_category_id\`) REFERENCES \`ent_category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`ent_product_categories\` DROP FOREIGN KEY \`FK_1176d66fdd104f54f32917a0ba0\``);
        await queryRunner.query(`ALTER TABLE \`ent_product_categories\` DROP FOREIGN KEY \`FK_a301797e3bc01a0760e806eb89d\``);
        await queryRunner.query(`ALTER TABLE \`ent_product\` DROP FOREIGN KEY \`FK_ed09acddbb99f2c378debf006b7\``);
        await queryRunner.query(`ALTER TABLE \`ent_product\` DROP FOREIGN KEY \`FK_f23815ed982b2d9e9c63b111429\``);
        await queryRunner.query(`ALTER TABLE \`ent_product\` DROP FOREIGN KEY \`FK_0766ed11654e02e44fd674386de\``);
        await queryRunner.query(`ALTER TABLE \`ent_product\` DROP FOREIGN KEY \`FK_aca2dc03934bd8111818179701c\``);
        await queryRunner.query(`ALTER TABLE \`ent_attachment\` DROP FOREIGN KEY \`FK_a040131cfca8aac239280265848\``);
        await queryRunner.query(`ALTER TABLE \`ent_attachment\` DROP FOREIGN KEY \`FK_c07258fcadd6cd6ce50f5a2b763\``);
        await queryRunner.query(`ALTER TABLE \`ent_attachment\` DROP FOREIGN KEY \`FK_1640cad91449dfd5a9a1baa3a3b\``);
        await queryRunner.query(`ALTER TABLE \`ent_category\` DROP FOREIGN KEY \`FK_3c8cf163a87b9e099947fc66de2\``);
        await queryRunner.query(`ALTER TABLE \`ent_category\` DROP FOREIGN KEY \`FK_55d4c31466635d79546c54bc121\``);
        await queryRunner.query(`ALTER TABLE \`ent_category\` DROP FOREIGN KEY \`FK_1b3477a75857145a0ce4806d747\``);
        await queryRunner.query(`ALTER TABLE \`ent_category\` DROP FOREIGN KEY \`FK_8d527f821b6eed06179894f0d5e\``);
        await queryRunner.query(`ALTER TABLE \`ent_user\` DROP FOREIGN KEY \`FK_b11b30be03b4bb47a637b4c2e64\``);
        await queryRunner.query(`ALTER TABLE \`ent_user\` DROP FOREIGN KEY \`FK_805aaea46df8caeefa0c957d983\``);
        await queryRunner.query(`ALTER TABLE \`ent_user\` DROP FOREIGN KEY \`FK_5aa6123805d0c686749917371a9\``);
        await queryRunner.query(`DROP INDEX \`IDX_1176d66fdd104f54f32917a0ba\` ON \`ent_product_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_a301797e3bc01a0760e806eb89\` ON \`ent_product_categories\``);
        await queryRunner.query(`DROP TABLE \`ent_product_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_1e29417c55c2cfd8fa9c8858d7\` ON \`ent_product\``);
        await queryRunner.query(`DROP TABLE \`ent_product\``);
        await queryRunner.query(`DROP TABLE \`ent_attachment\``);
        await queryRunner.query(`DROP INDEX \`IDX_55dd988b4138774afae46aa7a5\` ON \`ent_category\``);
        await queryRunner.query(`DROP TABLE \`ent_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_bb1fa9f7df3299e82ef270c91f\` ON \`ent_user\``);
        await queryRunner.query(`DROP TABLE \`ent_user\``);
    }

}

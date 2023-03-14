import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1678680527679 implements MigrationInterface {
  name = 'Init1678680527679'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`ent_user\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('Administrator', 'AdminSecond', 'User') NOT NULL DEFAULT 'User', \`gender\` enum ('Man', 'Woman') NULL, \`phone_number\` varchar(255) NULL, \`address\` varchar(255) NULL, \`birth_date\` datetime NULL, \`avatar\` varchar(255) NULL, \`otp\` int NULL, \`is_verified\` tinyint NOT NULL DEFAULT 0, \`token\` varchar(255) NULL, \`start_at\` datetime NULL, \`end_at\` datetime NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, \`deleted_by_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_bb1fa9f7df3299e82ef270c91f\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`ent_attachment\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`file_url\` varchar(255) NOT NULL, \`module\` varchar(255) NULL, \`created_by_id\` varchar(36) NULL, \`updated_by_id\` varchar(36) NULL, \`deleted_by_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `ALTER TABLE \`ent_user\` ADD CONSTRAINT \`FK_5aa6123805d0c686749917371a9\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`ent_user\` ADD CONSTRAINT \`FK_805aaea46df8caeefa0c957d983\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`ent_user\` ADD CONSTRAINT \`FK_b11b30be03b4bb47a637b4c2e64\` FOREIGN KEY (\`deleted_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`ent_attachment\` ADD CONSTRAINT \`FK_1640cad91449dfd5a9a1baa3a3b\` FOREIGN KEY (\`created_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`ent_attachment\` ADD CONSTRAINT \`FK_c07258fcadd6cd6ce50f5a2b763\` FOREIGN KEY (\`updated_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
    await queryRunner.query(
      `ALTER TABLE \`ent_attachment\` ADD CONSTRAINT \`FK_a040131cfca8aac239280265848\` FOREIGN KEY (\`deleted_by_id\`) REFERENCES \`ent_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`ent_attachment\` DROP FOREIGN KEY \`FK_a040131cfca8aac239280265848\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`ent_attachment\` DROP FOREIGN KEY \`FK_c07258fcadd6cd6ce50f5a2b763\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`ent_attachment\` DROP FOREIGN KEY \`FK_1640cad91449dfd5a9a1baa3a3b\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`ent_user\` DROP FOREIGN KEY \`FK_b11b30be03b4bb47a637b4c2e64\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`ent_user\` DROP FOREIGN KEY \`FK_805aaea46df8caeefa0c957d983\``,
    )
    await queryRunner.query(
      `ALTER TABLE \`ent_user\` DROP FOREIGN KEY \`FK_5aa6123805d0c686749917371a9\``,
    )
    await queryRunner.query(`DROP TABLE \`ent_attachment\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_bb1fa9f7df3299e82ef270c91f\` ON \`ent_user\``,
    )
    await queryRunner.query(`DROP TABLE \`ent_user\``)
  }
}

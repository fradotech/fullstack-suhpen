import { Injectable, Logger } from '@nestjs/common'
import { roleCreateSeeder } from '@server/modules/iam/role/database/role-create.seeder'
import { roleSyncGeneralPermissionsSeeder } from '@server/modules/iam/role/database/role-sync-general-permissions.seeder'
import { userCreateSeeder } from '../../modules/iam/user/database/user-create.seeder'
import { categoryCreateSeeder } from '../../modules/inventory/category/database/category-create.seeder'
import { productCreateSeeder } from '../../modules/inventory/product/database/product-create.seeder'
import { variantCreateSeeder } from '../../modules/inventory/variant/database/variant-create.seeder'
import dataSource from '../data-source'

@Injectable()
export class SeederMoodule {
  static async forRoot() {
    await dataSource
      .initialize()
      .then(async () =>
        Logger.log('Success connect automatic seeder', 'SeederConnect'),
      )
      .catch((error) => Logger.error(error))

    await roleCreateSeeder()
    await roleSyncGeneralPermissionsSeeder()
    await userCreateSeeder()
    await categoryCreateSeeder()
    await productCreateSeeder()
    await variantCreateSeeder()

    return { module: SeederMoodule }
  }
}

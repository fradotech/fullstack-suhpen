import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntInventory } from '@server/modules/feature/inventory/infrastructure/inventory.entity'
import { IInventory } from '@server/modules/feature/inventory/infrastructure/inventory.interface'
import { EntProduct } from '@server/modules/feature/product/infrastructure/product.entity'
import { EntityManager } from 'typeorm'
import { inventoryDummies } from './inventoy.dummy'

export const inventoryCreateSeeder = async (): Promise<boolean> => {
  const data = inventoryDummies
  const entityManager = new EntityManager(dataSource)
  const table = EntInventory.name

  const inventoryExist = await entityManager
    .createQueryBuilder(EntInventory, table)
    .where(`${table}.buyPrice IN (:buyPrice)`, {
      buyPrice: data.map((data) => data.buyPrice),
    })
    .getOne()

  if (inventoryExist) return false

  const products = await entityManager.find(EntProduct)
  const inventorys = data as unknown as IInventory[]

  for (let i = 0; i < inventorys.length; i++) {
    inventorys[i].product = products[i]
    inventorys[i].marginPrice = inventorys[i].sellPrice - inventorys[i].buyPrice
  }

  await entityManager
    .createQueryBuilder(EntInventory, table)
    .insert()
    .values(data)
    .execute()

  Logger.log(
    String(data.map((data) => data.buyPrice)),
    'SeederCreate:Inventory',
  )

  return true
}

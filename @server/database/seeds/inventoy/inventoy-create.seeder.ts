import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntInventory } from '@server/modules/feature/inventory/infrastructure/inventory.entity'
import { IInventory } from '@server/modules/feature/inventory/infrastructure/inventory.interface'
import { EntProduct } from '@server/modules/feature/product/infrastructure/product.entity'
import { IProduct } from '@server/modules/feature/product/infrastructure/product.interface'
import { EntityManager, Repository } from 'typeorm'
import { inventoryDummies } from './inventoy.dummy'

export const inventoryCreateSeeder = async (): Promise<boolean> => {
  const data = inventoryDummies
  const inventoryRepo = new Repository<IInventory>(
    EntInventory,
    new EntityManager(dataSource),
  )
  const table = EntInventory.name

  const inventoryExist = await inventoryRepo
    .createQueryBuilder(table)
    .where(`${table}.buyPrice IN (:buyPrice)`, {
      buyPrice: data.map((data) => data.buyPrice),
    })
    .getOne()

  if (inventoryExist) return false

  const productRepo = new Repository<IProduct>(
    EntProduct,
    new EntityManager(dataSource),
  )

  const products = await productRepo.find()
  const inventorys = data as unknown as IInventory[]

  for (let i = 0; i < inventorys.length; i++) {
    inventorys[i].product = products[i]
    inventorys[i].marginPrice = inventorys[i].sellPrice - inventorys[i].buyPrice
  }

  await inventoryRepo.save(data)

  Logger.log(
    String(data.map((data) => data.buyPrice)),
    'SeederCreate:Inventory',
  )

  return true
}

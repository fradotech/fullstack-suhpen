import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntInventory } from '@server/modules/feature/inventory/infrastructure/inventory.entity'
import { EntProduct } from '@server/modules/feature/product/infrastructure/product.entity'
import { EntityManager } from 'typeorm'
import { InventoryCreateRequest } from '../infrastructure/inventory.request'
import { inventoryDummies } from './inventoy.dummy'

export const inventoryCreateSeeder = async (): Promise<boolean> => {
  const data = InventoryCreateRequest.dtos(inventoryDummies)
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
  const inventorys = data

  for (let i = 0; i < inventorys.length; i++) {
    inventorys[i].product = products[i]
    inventorys[i].marginPrice = inventorys[i].sellPrice - inventorys[i].buyPrice
  }

  const dataCreate = entityManager.create(EntInventory, data)
  await entityManager.save(dataCreate)
  Logger.log(
    String(data.map((data) => data.buyPrice)),
    'SeederCreate:Inventory',
  )

  return true
}

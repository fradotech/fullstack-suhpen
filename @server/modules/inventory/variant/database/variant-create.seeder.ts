import { Logger } from '@nestjs/common'
import dataSource from '@server/database/data-source'
import { EntProduct } from '@server/modules/inventory/product/infrastructure/product.entity'
import { EntVariant } from '@server/modules/inventory/variant/infrastructure/variant.entity'
import { EntityManager } from 'typeorm'
import { VariantCreateRequest } from '../infrastructure/variant.request'
import { variantDummies } from './variant.dummy'

export const variantCreateSeeder = async (): Promise<boolean> => {
  const data = VariantCreateRequest.dtos(variantDummies)
  const entityManager = new EntityManager(dataSource)
  const table = EntVariant.name

  const variantExist = await entityManager
    .createQueryBuilder(EntVariant, table)
    .where(`${table}.buyPrice IN (:...buyPrice)`, {
      buyPrice: data.map((data) => data.buyPrice),
    })
    .getOne()

  if (variantExist) return false

  const products = await entityManager.find(EntProduct)
  const variants = data

  for (let i = 0; i < variants.length; i++) {
    variants[i].product = products[i]
    variants[i].marginPrice = variants[i].sellPrice - variants[i].buyPrice
  }

  const dataCreate = entityManager.create(EntVariant, data)
  await entityManager.save(dataCreate)
  Logger.log(String(data.map((data) => data.buyPrice)), 'SeederCreate:Variant')

  return true
}

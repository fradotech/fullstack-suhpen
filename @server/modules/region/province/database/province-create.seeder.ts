import { Logger } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { RegionProvince } from '../infrastructure/province.entity'
import { data } from './osvas-province-202210310943.json'

export const provinceCreateSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const table = RegionProvince.name

  const provinceExist = await entityManager
    .createQueryBuilder(RegionProvince, table)
    .where(`${table}.oid IN (:...oid)`, { oid: data.map((data) => data.oid) })
    .getOne()

  if (provinceExist) return false

  const dataCreate = entityManager.create(RegionProvince, data)
  await entityManager.save(dataCreate)

  Logger.log('Provinces', 'AutomaticSeeder')

  return true
}

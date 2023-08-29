import { Logger } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { RegionCity } from '../../city/infrastructure/city.entity'
import { RegionDistrict } from '../infrastructure/district.entity'
import { data } from './osvas-district-202210310943.json'

export const districtCreateSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const table = RegionDistrict.name

  const districtExist = await entityManager
    .createQueryBuilder(RegionDistrict, table)
    .where(`${table}.oid IN (:...oid)`, { oid: data.map((data) => data.oid) })
    .getOne()

  if (districtExist) return false

  const cities = await entityManager.find(RegionCity)

  for (let i = 0; i < data.length; i++) {
    data[i]['city'] = cities.find((city) => {
      return data[i].city_id === city.oid
    })
  }

  const dataCreate = entityManager.create(RegionDistrict, data)
  await entityManager.save(dataCreate)

  Logger.log('Districts', 'AutomaticSeeder')

  return true
}

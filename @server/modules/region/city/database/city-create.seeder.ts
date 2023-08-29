import { Logger } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { RegionProvince } from '../../province/infrastructure/province.entity'
import { RegionCity } from '../infrastructure/city.entity'
import { data } from './osvas-city-202210310941.json'

export const cityCreateSeeder = async (
  entityManager: EntityManager,
): Promise<boolean> => {
  const table = RegionCity.name

  const cityExist = await entityManager
    .createQueryBuilder(RegionCity, table)
    .where(`${table}.oid IN (:...oid)`, { oid: data.map((data) => data.oid) })
    .getOne()

  if (cityExist) return false

  const provinces = await entityManager.find(RegionProvince)

  for (let i = 0; i < data.length; i++) {
    data[i]['province'] = provinces.find((province) => {
      return data[i].province_id === province.oid
    })
  }

  const dataCreate = entityManager.create(RegionCity, data)
  await entityManager.save(dataCreate)

  Logger.log('Cities', 'AutomaticSeeder')

  return true
}

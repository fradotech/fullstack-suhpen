import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { RegionCity } from './city.entity'

export class CityIndexFilterRequest extends RegionCity {}

export class CityIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => CityIndexFilterRequest)
  filters?: CityIndexFilterRequest
}

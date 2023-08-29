import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { RegionProvince } from './province.entity'

export class ProvinceIndexFilterRequest extends RegionProvince {}

export class ProvinceIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => ProvinceIndexFilterRequest)
  filters?: ProvinceIndexFilterRequest
}

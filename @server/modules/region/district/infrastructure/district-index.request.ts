import { ApiProperty } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { RegionDistrict } from './district.entity'

export class DistrictIndexFilterRequest extends RegionDistrict {}

export class DistrictIndexRequest extends IndexRequest {
  @ValidateNested({ each: true })
  @Type(() => DistrictIndexFilterRequest)
  filters?: DistrictIndexFilterRequest

  @ApiProperty({ required: false })
  cityId: string
}

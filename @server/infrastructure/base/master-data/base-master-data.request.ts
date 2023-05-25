import { ApiProperty } from '@nestjs/swagger'
import { IBaseMasterData } from './base-master-data.interface'

export class BaseMasterDataRequest implements IBaseMasterData {
  parent?: IBaseMasterData
  childs?: IBaseMasterData[]
  id: string

  @ApiProperty({ example: 'Product FDO 3000 Pro Max' })
  name: string

  @ApiProperty()
  key: string

  @ApiProperty()
  isActive: boolean

  @ApiProperty()
  description?: string

  @ApiProperty()
  thumbnail?: string
}

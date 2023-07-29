import { ApiProperty } from '@nestjs/swagger'
import { EntBaseMasterData } from './base-master-data.entity'
import { IBaseMasterData } from './base-master-data.interface'

export class BaseMasterDataRequest
  extends EntBaseMasterData
  implements IBaseMasterData
{
  parent?: IBaseMasterData
  childs?: IBaseMasterData[]

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

  @ApiProperty({ example: '#007fd0' })
  labelColor?: string
}

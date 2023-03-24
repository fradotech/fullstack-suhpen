import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { IBaseMasterData } from './base-master-data.interface'

export class BaseMasterDataRequest implements IBaseMasterData {
  parent?: IBaseMasterData
  childs?: IBaseMasterData[]
  id: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Product FDO 3000 Pro Max' })
  name: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  key: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  isActive: boolean

  @IsOptional()
  @IsString()
  @ApiProperty()
  description?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  thumbnail?: string
}

import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { IBaseProduct } from './base-product.interface'

export class BaseProductRequest implements IBaseProduct {
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

  @IsOptional()
  @IsString()
  @ApiProperty()
  parent?: IBaseProduct

  @IsOptional()
  @IsString()
  @ApiProperty()
  childs?: IBaseProduct[]
}

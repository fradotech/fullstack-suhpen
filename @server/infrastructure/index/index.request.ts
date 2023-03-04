import { ApiProperty } from '@nestjs/swagger'
import {
  OrderDirectionEnum,
  OrderDirectionType,
} from '@server/infrastructure/index/index.enum'
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { IPaginateRequest, ISortRequest } from './index.interface'

export class IndexRequest implements ISortRequest, IPaginateRequest {
  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'updatedAt',
    description: 'Sort entity by field name',
  })
  sortField?: string

  @IsOptional()
  @IsEnum(OrderDirectionEnum)
  @ApiProperty({
    example: OrderDirectionEnum.Desc,
    description: `${OrderDirectionEnum.Asc} || ${OrderDirectionEnum.Desc}`,
  })
  sortOrder?: OrderDirectionType

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 10, description: 'Number of entities in one page' })
  pageSize?: number

  @IsOptional()
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 1, description: 'The page where you are' })
  page?: number

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '',
    description: 'Search all entity column value',
    required: false,
  })
  search?: string

  @IsString()
  @IsOptional()
  startAt?: string

  @IsString()
  @IsOptional()
  endAt?: string
}

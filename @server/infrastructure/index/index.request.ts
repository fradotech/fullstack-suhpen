import { ApiProperty } from '@nestjs/swagger'
import { OrderDirectionEnum } from '@server/infrastructure/index/index.enum'
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import { IPaginateRequest, ISortRequest } from './index.interface'

export class IndexRequest implements ISortRequest, IPaginateRequest {
  isExport?: boolean

  @IsOptional()
  filters?: Record<string, any>

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
  sortOrder?: OrderDirectionEnum

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

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '',
    description: 'Column name for filter startAt and endAt',
    required: false,
  })
  dateRangeColumn?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '',
    description: 'Filter startAt by dateRangeColumn',
    required: false,
  })
  startAt?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '',
    description: 'Filter endAt by dateRangeColumn',
    required: false,
  })
  endAt?: string
}

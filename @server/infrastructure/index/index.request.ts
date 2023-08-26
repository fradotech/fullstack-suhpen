import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator'
import {
  IPaginateRequest,
  ISortRequest,
  IndexSortOderEnum,
} from './index.interface'

export abstract class IndexRequest implements ISortRequest, IPaginateRequest {
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
  @IsEnum(IndexSortOderEnum)
  @ApiProperty({
    example: 'DESC',
    description: 'ASC || DESC',
  })
  sortOrder?: IndexSortOderEnum

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
    description: 'Search all entity column value',
    required: false,
  })
  search?: string

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Column name for filter startAt and endAt',
    required: false,
  })
  dateRangeColumn?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Filter startAt by dateRangeColumn',
    required: false,
  })
  startAt?: string

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Filter endAt by dateRangeColumn',
    required: false,
  })
  endAt?: string
}

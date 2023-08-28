import { ApiProperty } from '@nestjs/swagger'
import { IndexRequest } from '@server/infrastructure/index/index.request'

export class LogActivityIndexRequest extends IndexRequest {
  @ApiProperty({
    example: 'createdAt',
    description: 'Sort entity by field name',
  })
  sortField = 'createdAt'
}

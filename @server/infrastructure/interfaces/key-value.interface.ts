import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class KeyValueType {
  @IsNotEmpty()
  @ApiProperty({ example: 'customerName' })
  key: string

  @ApiProperty({ example: 'Customer' })
  value: string
}

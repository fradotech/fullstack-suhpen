import { ApiProperty } from '@nestjs/swagger'
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator'

export class NotificationPushReadOneRequest {
  @IsNotEmpty()
  @IsUUID()
  id: string
}

export class NotificationPushReadManyRequest {
  @IsNotEmpty()
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayMinSize(1)
  @ApiProperty({ example: ['id1', 'id2', 'id3'] })
  ids: string[]
}

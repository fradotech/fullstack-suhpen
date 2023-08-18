import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Entity } from 'typeorm'
import { IAttachment } from './attachment.interface'

@Entity()
export class Attachment extends BaseEntity implements IAttachment {
  @ApiProperty()
  @Column()
  fileUrl: string

  @ApiProperty()
  @Column({ nullable: true })
  module?: string
}

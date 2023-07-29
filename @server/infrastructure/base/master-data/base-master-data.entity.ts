import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '@server/infrastructure/base/base.entity'
import { Column, Index } from 'typeorm'
import { IBaseMasterData } from './base-master-data.interface'

export class EntBaseMasterData extends BaseEntity implements IBaseMasterData {
  @ApiProperty({ example: 'Product FDO 3000 Pro Max' })
  @Index()
  @Column()
  name: string

  @ApiProperty()
  @Column({ default: null, unique: true })
  key: string

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean

  @ApiProperty()
  @Column({ default: null, type: 'text' })
  description?: string

  @ApiProperty()
  @Column({ default: null })
  thumbnail?: string

  @ApiProperty({ example: '#007fd0' })
  @Column({ default: '#007fd0' })
  labelColor?: string
}

import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ILogActivity } from './log-activity.interface'

@Entity()
export class LogActivity implements ILogActivity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn()
  createdAt: Date

  @Column()
  executeTimeInMs: number

  @Column()
  method: string

  @Column()
  path: string

  @Column()
  remoteAddress: string

  @Column({ type: 'jsonb' })
  headers: Headers

  @Column({ type: 'jsonb', default: null })
  user: IUser

  @Column({ type: 'jsonb', default: null })
  body: ReadableStream<Uint8Array> | null
}

import { EntBaseMasterData } from '@server/infrastructure/base/master-data/base-master-data.entity'
import { Entity } from 'typeorm'
import { IMessageCategory } from './message-category.interface'

@Entity()
export class EntMessageCategory
  extends EntBaseMasterData
  implements IMessageCategory {}

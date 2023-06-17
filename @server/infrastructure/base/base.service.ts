import { IBaseEntity } from './base-entity.interface'

export abstract class BaseService {
  abstract findByInIds(...arg: any): Promise<IBaseEntity[]>
}

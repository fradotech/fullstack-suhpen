import { IBaseEntity } from './base-entity.interface'

export abstract class BaseService {
  abstract create(...arg: any): Promise<IBaseEntity>
  abstract find(): Promise<IBaseEntity[]>
  abstract findOne(...arg: any): Promise<IBaseEntity>
  abstract findOneOrFail(...arg: any): Promise<IBaseEntity>
  abstract update(...arg: any): Promise<IBaseEntity>
  abstract remove(...arg: any): Promise<IBaseEntity>
  abstract softRemove(...arg: any): Promise<IBaseEntity>
  abstract findNoRelation(...arg: any): Promise<IBaseEntity | IBaseEntity[]>
}

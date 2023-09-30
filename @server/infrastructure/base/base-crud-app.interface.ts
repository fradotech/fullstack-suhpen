import { IBaseEntity } from './base-entity.interface'

export interface IBaseCrudUsecase {
  find: (...arg: any) => Promise<IBaseEntity[]>
  create: (...arg: any) => Promise<IBaseEntity>
  findOneOrFail: (...arg: any) => Promise<IBaseEntity>
  update: (...arg: any) => Promise<IBaseEntity>
  delete: (...arg: any) => Promise<IBaseEntity>
}

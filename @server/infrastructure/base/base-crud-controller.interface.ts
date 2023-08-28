import { IApiRes } from '../interfaces/api-responses.interface'
import { IBaseEntity } from './base-entity.interface'

export interface IBaseCrudController {
  fetch: (...arg: any) => Promise<IApiRes<IBaseEntity[]>>
  create: (...arg: any) => Promise<IApiRes<IBaseEntity>>
  findOneOrFail: (...arg: any) => Promise<IApiRes<IBaseEntity>>
  update: (...arg: any) => Promise<IApiRes<IBaseEntity>>
  delete: (...arg: any) => Promise<IApiRes<IBaseEntity>>
}

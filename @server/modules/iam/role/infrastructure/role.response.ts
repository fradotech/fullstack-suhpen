import { RoleEnum } from '@server/modules/iam/role/common/role.enum'
import { IRole } from './role.interface'

export class RoleResponse implements IRole {
  id: string
  name: RoleEnum
  static dto(data: IRole): RoleResponse {
    const res = new RoleResponse()
    Object.assign(res, data)
    return res
  }

  static dtos(data: IRole[]): RoleResponse[] {
    return data.map((data) => this.dto(data))
  }
}

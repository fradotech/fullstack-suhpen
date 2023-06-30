import { EntRole } from './role.entity'
import { IRole } from './role.interface'

export class RoleResponse extends EntRole {
  static dto(data: IRole): RoleResponse {
    const res = new RoleResponse()
    Object.assign(res, data)

    return res
  }

  static dtos(data: IRole[]): RoleResponse[] {
    return data.map((data) => this.dto(data))
  }
}

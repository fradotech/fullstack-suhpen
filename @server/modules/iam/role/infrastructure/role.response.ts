import { IamRole } from './role.entity'
import { IRole } from './role.interface'

export class RoleResponse extends IamRole {
  permissionIds: string[]

  static dto(data: IRole): RoleResponse {
    const res = new RoleResponse()
    Object.assign(res, data)

    res.permissionIds = data.permissions?.map((data) => data.id) || []

    return res
  }

  static dtos(data: IRole[]): RoleResponse[] {
    return data.map((data) => this.dto(data))
  }
}

import { IamRole } from './role.entity'
import { IIamRole } from './role.interface'

export class RoleResponse extends IamRole {
  permissionIds: string[]

  static dto(data: IIamRole): RoleResponse {
    const res = new RoleResponse()
    Object.assign(res, data)

    res.permissionIds = data.permissions?.map((data) => data.id) || []

    return res
  }

  static dtos(data: IIamRole[]): RoleResponse[] {
    return data.map((data) => this.dto(data))
  }
}

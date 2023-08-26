import { IamPermission } from './permission.entity'
import { IIamPermission } from './permission.interface'

export class PermissionResponse extends IamPermission {
  static dto(data: IIamPermission): PermissionResponse {
    const res = new PermissionResponse()
    Object.assign(res, data)

    return res
  }

  static dtos(data: IIamPermission[]): PermissionResponse[] {
    return data.map((data) => this.dto(data))
  }
}

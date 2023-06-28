import { EntPermission } from './permission.entity'
import { IPermission } from './permission.interface'

export class PermissionResponse extends EntPermission {
  static dto(data: IPermission): PermissionResponse {
    const res = new PermissionResponse()
    Object.assign(res, data)

    return res
  }

  static dtos(data: IPermission[]): PermissionResponse[] {
    return data.map((data) => this.dto(data))
  }
}

import { EntPermission } from './permission.entity'
import { IPermission } from './permission.interface'

export class PermissionResponse extends EntPermission {
  static fromEntity(data: IPermission): PermissionResponse {
    const res = new PermissionResponse()
    Object.assign(res, data)

    return res
  }

  static fromEntities(data: IPermission[]): PermissionResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}

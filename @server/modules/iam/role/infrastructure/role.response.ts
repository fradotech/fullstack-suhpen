import { ERole } from 'client/Modules/Iam/Role/Role.enum'
import { IRole } from './role.interface'

export class RoleResponse implements IRole {
  id: string
  name: ERole
  static fromEntity(data: IRole): RoleResponse {
    const res = new RoleResponse()
    Object.assign(res, data)
    return res
  }

  static fromEntities(data: IRole[]): RoleResponse[] {
    return data.map((data) => this.fromEntity(data))
  }
}

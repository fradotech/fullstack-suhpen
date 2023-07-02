import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { RoleIndexRequest } from '@server/modules/iam/role/infrastructure/role-index.request'
import {
  RoleCreateRequest,
  RoleUpdateRequest,
} from '@server/modules/iam/role/infrastructure/role.request'
import { RoleResponse } from '@server/modules/iam/role/infrastructure/role.response'
import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'
import { notification } from 'antd'
import { UseQueryResult, useQuery } from 'react-query'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { getColorPicker } from '../../../../Components/Molecules/ColorPicker/ColorPicker.util'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

const dto = (
  data: RoleCreateRequest | RoleUpdateRequest,
): RoleCreateRequest | RoleUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string
  data.labelColor = getColorPicker(data.labelColor)

  return data
}
export class RoleAction {
  static useIndex(
    req?: RoleIndexRequest,
  ): UseQueryResult<IPaginateResponse<RoleResponse>> {
    const fetch = async () => await API.get(Path.role.index, req)
    return useQuery([RoleAction.useIndex.name, req], fetch)
  }

  static async create(data: RoleCreateRequest): Promise<IApiRes<RoleResponse>> {
    data = dto(data)
    const res = await API.post(Path.role.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  }

  static async findOne(id: string): Promise<IApiRes<RoleResponse>> {
    const res: IApiRes<RoleResponse> = await API.get(Path.role.id(id))

    return res
  }

  static async update(
    id: string,
    data: RoleUpdateRequest,
  ): Promise<IApiRes<RoleResponse>> {
    data = dto(data)
    const res = await API.put(Path.role.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  }

  static async delete(id: string): Promise<IApiRes<RoleResponse>> {
    const res = await API.delete(Path.role.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  }

  /// --- Utils --- \\\

  static validatePermission(user: IUser, path: string): boolean {
    return user.roles.some((role) => {
      return role.permissions.some((permission) => {
        return path === permission.path
      })
    })
  }
}

import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { PermissionIndexRequest } from '@server/modules/iam/permission/infrastructure/permission-index.request'
import {
  PermissionCreateRequest,
  PermissionUpdateRequest,
} from '@server/modules/iam/permission/infrastructure/permission.request'
import { PermissionResponse } from '@server/modules/iam/permission/infrastructure/permission.response'
import { notification } from 'antd'
import { UseQueryResult, useQuery } from 'react-query'
import {
  IPaginateResponse,
  IndexSortOderEnum,
} from '../../../../../@server/infrastructure/index/index.interface'
import { getAttachment } from '../../../../Components/Molecules/Attachment/attachment.util'
import { getColorPicker } from '../../../../Components/Molecules/ColorPicker/ColorPicker.util'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

const dto = (
  data: PermissionCreateRequest | PermissionUpdateRequest,
): PermissionCreateRequest | PermissionUpdateRequest => {
  data.thumbnail = getAttachment(data.thumbnail) as string
  data.labelColor = getColorPicker(data.labelColor)

  return data
}
export class PermissionAction {
  static useIndex(
    req?: PermissionIndexRequest,
  ): UseQueryResult<IPaginateResponse<PermissionResponse>> {
    if (!req.sortField) req.sortField = 'module'
    if (!req.sortOrder) req.sortOrder = IndexSortOderEnum.Asc

    const fetch = async () => await API.get(Path.permission.index, req)
    return useQuery([PermissionAction.useIndex.name, req], fetch)
  }

  static async create(
    data: PermissionCreateRequest,
  ): Promise<IApiRes<PermissionResponse>> {
    data = dto(data)
    const res = await API.post(Path.permission.index, data)
    res.data && notification.success({ message: 'Success create data' })
    return res
  }

  static async findOne(id: string): Promise<IApiRes<PermissionResponse>> {
    const res: IApiRes<PermissionResponse> = await API.get(
      Path.permission.id(id),
    )

    return res
  }

  static async update(
    id: string,
    data: PermissionUpdateRequest,
  ): Promise<IApiRes<PermissionResponse>> {
    data = dto(data)
    const res = await API.put(Path.permission.id(id), data)
    res.data && notification.success({ message: 'Success update data' })
    return res
  }

  static async delete(id: string): Promise<IApiRes<PermissionResponse>> {
    const res = await API.delete(Path.permission.id(id))
    res.data && notification.success({ message: 'Success delete data' })
    return res
  }
}

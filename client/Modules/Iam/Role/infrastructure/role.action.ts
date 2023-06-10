import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { RoleResponse } from '@server/modules/iam/role/infrastructure/role.response'
import { RoleEnum } from '../../../../../@server/modules/iam/role/common/role.enum'
import { Route } from '../../../../Enums/Route'
import { API } from '../../../../services/api.service'

export const roleAction = {
  fetch: async (): Promise<IPaginateResponse<RoleResponse>> => {
    return await API.get(Route.role)
  },

  findOne: async (id: string): Promise<IApiRes<RoleResponse>> => {
    return await API.get(`${Route.role}/${id}`)
  },

  // --- Another --- \\

  colorRole: (status: RoleEnum): string => {
    const color = new Map()

    color.set(RoleEnum.SuperAdmin, 'blue')
    color.set(RoleEnum.Admin, 'green')
    color.set(RoleEnum.User, 'yellow')

    return color.get(status)
  },
}

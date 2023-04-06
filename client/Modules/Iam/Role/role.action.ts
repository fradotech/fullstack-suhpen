import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { RoleResponse } from '@server/modules/iam/role/infrastructure/role.response'
import { Route } from '../../../Enums/Route'
import { axiosService } from '../../../services/axios.service'
import { ERole } from './Role.enum'

export const roleAction = {
  fetch: async (): Promise<IPaginateResponse<RoleResponse>> => {
    return await axiosService.get(Route.role)
  },

  findOne: async (id: string): Promise<IApiRes<RoleResponse>> => {
    return await axiosService.get(`${Route.role}/${id}`)
  },

  // --- Another --- \\

  colorRole: (status: ERole): string => {
    const color = {}
    color[ERole.SuperAdmin] = 'blue'
    color[ERole.Admin] = 'green'
    color[ERole.User] = 'yellow'

    return color[status]
  },
}

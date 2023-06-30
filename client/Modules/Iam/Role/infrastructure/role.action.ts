import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { RoleResponse } from '@server/modules/iam/role/infrastructure/role.response'
import { UseQueryResult, useQuery } from 'react-query'
import { Route } from '../../../../Enums/Route'
import { API } from '../../../../infrastructure/api.service'

export class RoleAction {
  static useIndex(): UseQueryResult<IPaginateResponse<RoleResponse>> {
    const fetch = async () => await API.get(Route.role)
    return useQuery([RoleAction.useIndex.name], fetch)
  }

  static async findOne(id: string): Promise<IApiRes<RoleResponse>> {
    return await API.get(`${Route.role}/${id}`)
  }
}

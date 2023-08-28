import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'

import { LogActivityResponse } from '@server/modules/setting/logger/infrastructure/log-activity.response'
import { LogActivityIndexRequest } from '@server/modules/setting/logger/v1/log-activity-index.request'
import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'
import { Path } from '../../../../common/Path'
import { API } from '../../../../infrastructure/api.service'

export class LogActivityAction {
  static useIndex(
    req?: LogActivityIndexRequest,
    options?: UseQueryOptions<IPaginateResponse<LogActivityResponse>>,
  ): UseQueryResult<IPaginateResponse<LogActivityResponse>> {
    const fetch = async () => await API.get(Path.logActivity.index, req)
    return useQuery([Path.logActivity.index, req], fetch, options)
  }

  static async findOne(
    id: string | undefined,
  ): Promise<IApiRes<LogActivityResponse>> {
    const res: IApiRes<LogActivityResponse> = await API.get(
      Path.logActivity.id(id),
    )

    return res
  }
}

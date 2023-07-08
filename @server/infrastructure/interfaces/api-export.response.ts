import { IBaseEntity } from '../base/base-entity.interface'
import { IApiExportRes } from './api-responses.interface'

export class ApiExportRes implements IApiExportRes<any> {
  message: string
  data: any
  fileName?: string

  static dto(
    data?: IBaseEntity | IBaseEntity[] | any,
    fileName?: string,
    message?: string,
  ): ApiExportRes {
    const res = new ApiExportRes()

    res.message = message || 'Successfull download data export!'
    res.data = data
    res.fileName = fileName

    !fileName && delete res.fileName

    return res
  }
}

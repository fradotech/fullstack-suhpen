import { LogActivity } from '../infrastructure/log-activity.entity'

export class LogActivityCreateRequest extends LogActivity {
  static dto(executeTime: number, request: Request): LogActivityCreateRequest {
    const res = new LogActivityCreateRequest()

    if (request['user']) {
      delete request['user']['password']
      delete request['user']['roles']
    }

    res.executeTimeInMs = executeTime
    res.method = request.method.toLowerCase()
    res.path = request.url
    res.remoteAddress = request['socket'].remoteAddress
    res.headers = request.headers
    res.user = request['user']
    res.body = request.body

    return res
  }
}

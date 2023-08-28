import { LogActivity } from './log-activity.entity'
export class LogActivityResponse extends LogActivity {
  static dto(executeTime: number, request: Request): LogActivityResponse {
    const res = new LogActivityResponse()

    if (request['user']) delete request['user']['roles']

    res.executeTimeInMs = executeTime
    res.method = request.method
    res.path = request.url
    res.remoteAddress = request['socket'].remoteAddress
    res.headers = request.headers
    res.user = request['user']
    res.body = request.body

    return res
  }
}

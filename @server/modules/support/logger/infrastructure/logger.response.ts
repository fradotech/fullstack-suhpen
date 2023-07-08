import { IUser } from '@server/modules/iam/user/infrastructure/user.interface'

export class LoggerResponse {
  createdAt: number
  executeTime: number
  method: string
  url: string
  headers: Headers
  remoteAddress: string
  user: IUser
  body: ReadableStream<Uint8Array>

  static dto(executeTime: number, request: Request): LoggerResponse {
    const res = new LoggerResponse()

    delete request['user']['roles']

    res.createdAt = Date.now()
    res.executeTime = executeTime
    res.method = request.method
    res.url = request.url
    res.headers = request.headers
    res.remoteAddress = request['socket'].remoteAddress
    res.user = request['user']
    res.body = request.body

    return res
  }
}

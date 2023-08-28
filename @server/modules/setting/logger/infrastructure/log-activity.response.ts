import { LogActivity } from './log-activity.entity'
import { ILogActivity } from './log-activity.interface'

export class LogActivityResponse extends LogActivity {
  static dto(data: ILogActivity): LogActivityResponse {
    const res = new LogActivityResponse()
    Object.assign(res, data)

    return res
  }

  static dtos(data: ILogActivity[]): LogActivityResponse[] {
    return data.map((data) => this.dto(data))
  }
}

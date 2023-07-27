import { EntNotificationTemplate } from './notification-template.entity'
import { INotificationTemplate } from './notification-template.interface'

export class NotificationTemplateResponse extends EntNotificationTemplate {
  static dto(data: INotificationTemplate): NotificationTemplateResponse {
    const res = new NotificationTemplateResponse()
    Object.assign(res, data)

    return res
  }

  static dtos(data: INotificationTemplate[]): NotificationTemplateResponse[] {
    return data.map((data) => this.dto(data))
  }
}

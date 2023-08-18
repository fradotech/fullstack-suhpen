import { NotificationTemplate } from './notification-template.entity'
import { INotificationTemplate } from './notification-template.interface'

export class NotificationTemplateResponse extends NotificationTemplate {
  categoryId: string
  static dto(data: INotificationTemplate): NotificationTemplateResponse {
    const res = new NotificationTemplateResponse()
    Object.assign(res, data)

    res.categoryId = data.category?.id

    return res
  }

  static dtos(data: INotificationTemplate[]): NotificationTemplateResponse[] {
    return data.map((data) => this.dto(data))
  }
}

import { Modules } from '../../../../../@server/modules/modules'

const index = `/${Modules.NotificationTemplate}`
const sheet = `/${Modules.NotificationTemplateSheet}`

export const notificationTemplatePath = {
  index,
  form: `${index}/new`,
  id: (id?: string) => `${index}/${id || ':id'}`,
  sheet: {
    import: `${sheet}/import`,
    export: `${sheet}/export`,
  },
}

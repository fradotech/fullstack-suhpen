import { Modules } from '../../../../../@server/modules/modules'

const index = `/${Modules.NotificationCategory}`
const sheet = `/${Modules.NotificationCategorySheet}`

export const notificationCategoryPath = {
  index,
  form: `${index}/new`,
  id: (id?: string) => `${index}/${id || ':id'}`,
  sheet: {
    import: `${sheet}/import`,
    export: `${sheet}/export`,
  },
}

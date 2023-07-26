import { Modules } from '../../../../../@server/modules/modules'

const root = `/${Modules.NotificationCategory}`
const sheet = `/${Modules.NotificationCategorySheet}`

export const notificationCategoryPath = {
  index: root,
  form: `${root}/new`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  sheet: {
    import: `${sheet}/import`,
    export: `${sheet}/export`,
  },
}

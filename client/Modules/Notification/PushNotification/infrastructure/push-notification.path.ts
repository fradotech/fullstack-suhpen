import { Modules } from '../../../../../@server/modules/modules'

const root = `/${Modules.PushNotification}`
const sheet = `/${Modules.PushNotificationSheet}`
const read = `/${Modules.PushNotificationRead}`

export const pushNotificationPath = {
  index: root,
  form: `${root}/new`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  sheet: {
    import: `${sheet}/import`,
    export: `${sheet}/export`,
  },
  read: {
    one: `${read}/one`,
    many: `${read}/many`,
  },
}

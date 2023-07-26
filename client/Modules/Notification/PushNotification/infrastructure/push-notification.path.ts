import { Modules } from '../../../../../@server/modules/modules'

const index = `/${Modules.PushNotification}`
const sheet = `/${Modules.PushNotificationSheet}`
const read = `/${Modules.PushNotificationRead}`

export const pushNotificationPath = {
  index,
  form: `${index}/new`,
  id: (id?: string) => `${index}/${id || ':id'}`,
  sheet: {
    import: `${sheet}/import`,
    export: `${sheet}/export`,
  },
  read: {
    index: read,
    id: (id?: string) => `${read}/${id || ':id'}`,
    one: `${read}/one`,
    many: `${read}/many`,
  },
}

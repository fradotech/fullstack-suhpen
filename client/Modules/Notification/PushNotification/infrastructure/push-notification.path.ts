import { Modules } from '../../../../../@server/modules/modules'

const root = `/${Modules.PushNotification}`

export const pushNotificationPath = {
  index: root,
  form: `${root}/new`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  import: `${root}/sheet/import`,
  export: `${root}/sheet/export`,
}

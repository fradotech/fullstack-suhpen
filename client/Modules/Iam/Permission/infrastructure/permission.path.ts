import { Modules } from '../../../../../@server/modules/modules'

const root = `/${Modules.Permission}`
const sheet = `/${Modules.PermissionSheet}`

export const permissionPath = {
  index: root,
  form: `${root}/new`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  sheet: {
    import: `${sheet}/import`,
    export: `${sheet}/export`,
  },
}

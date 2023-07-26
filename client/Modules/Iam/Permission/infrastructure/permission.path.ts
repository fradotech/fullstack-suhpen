import { Modules } from '../../../../../@server/modules/modules'

const index = `/${Modules.Permission}`
const sheet = `/${Modules.PermissionSheet}`

export const permissionPath = {
  index,
  form: `${index}/new`,
  id: (id?: string) => `${index}/${id || ':id'}`,
  sheet: {
    import: `${sheet}/import`,
    export: `${sheet}/export`,
  },
}

import { Modules } from '../../../../../@server/modules/modules'

const root = `/${Modules.Role}`
const sheet = `/${Modules.RoleSheet}`

export const rolePath = {
  index: root,
  form: `${root}/new`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  sheet: {
    import: `${sheet}/import`,
    export: `${sheet}/export`,
  },
}

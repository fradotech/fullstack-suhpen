import { Modules } from '../../../../../@server/modules/modules'

const index = `/${Modules.Role}`
const sheet = `/${Modules.RoleSheet}`

export const rolePath = {
  index,
  form: `${index}/new`,
  id: (id?: string) => `${index}/${id || ':id'}`,
  sheet: {
    import: `${sheet}/import`,
    export: `${sheet}/export`,
  },
}

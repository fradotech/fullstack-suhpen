import { Modules } from '../../../../../@server/modules/modules'

const root = `/${Modules.User}`
const sheet = `/${Modules.UserSheet}`

export const userPath = {
  index: root,
  form: `${root}/new`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  sheet: {
    import: `${sheet}/import`,
    export: `${sheet}/export`,
  },
}

import { Modules } from '../../../../../@server/modules/modules'

const index = `/${Modules.User}`
const sheet = `/${Modules.UserSheet}`

export const userPath = {
  index,
  form: `${index}/new`,
  id: (id?: string) => `${index}/${id || ':id'}`,
  sheet: {
    import: `${sheet}/import`,
    export: `${sheet}/export`,
  },
}

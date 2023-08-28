import { Modules } from '../../../../../@server/modules/modules'

const index = `/${Modules.Log}`
const sheet = `/${Modules.LogSheet}`

export const logActivityPath = {
  index,
  id: (id?: string) => `${index}/${id || ':id'}`,
  sheet: {
    import: `${sheet}/import`,
    export: `${sheet}/export`,
  },
}

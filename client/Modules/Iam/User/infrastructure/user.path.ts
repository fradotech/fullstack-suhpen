import { Modules } from '../../../../../@server/modules/modules'

const root = `/${Modules.User}`

export const userPath = {
  index: root,
  form: `${root}/new`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  import: `${root}/sheet/import`,
  export: `${root}/sheet/export`,
}

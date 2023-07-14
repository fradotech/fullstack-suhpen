import { Modules } from '../../../../../@server/modules/modules'

const root = `/${Modules.Role}`

export const rolePath = {
  index: root,
  form: `${root}/save`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  import: `${root}/sheet/import`,
  export: `${root}/sheet/export`,
}

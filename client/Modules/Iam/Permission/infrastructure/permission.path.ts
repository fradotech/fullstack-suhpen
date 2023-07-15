import { Modules } from '../../../../../@server/modules/modules'

const root = `/${Modules.Permission}`

export const permissionPath = {
  index: root,
  form: `${root}/new`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  import: `${root}/sheet/import`,
  export: `${root}/sheet/export`,
}

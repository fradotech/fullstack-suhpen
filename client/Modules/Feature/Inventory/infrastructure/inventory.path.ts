import { Modules } from '../../../../../@server/modules/modules'

const root = `/${Modules.Inventory}`

export const inventoryPath = {
  index: root,
  form: (productId?: string) => `${root}/${productId || ':productId'}/save`,
  edit: (id?: string) => `${root}/save/${id || ':id'}`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  import: `${root}/sheet/import`,
  export: `${root}/sheet/export`,
}

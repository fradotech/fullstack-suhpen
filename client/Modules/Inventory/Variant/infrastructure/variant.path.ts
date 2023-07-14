import { Modules } from '../../../../../@server/modules/modules'

const root = `/${Modules.Variant}`

export const variantPath = {
  index: root,
  form: (productId?: string) => `${root}/${productId || ':productId'}/save`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  import: `${root}/sheet/import`,
  export: `${root}/sheet/export`,
}

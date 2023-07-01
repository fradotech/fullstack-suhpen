const root = '/inventories'

export const inventoryPath = {
  index: root,
  form: (productId?: string) => `${root}/${productId || ':productId'}/save`,
  edit: (id?: string) => `${root}/save/${id || ':id'}`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  import: `${root}/sheet/import`,
  export: `${root}/sheet/export`,
}

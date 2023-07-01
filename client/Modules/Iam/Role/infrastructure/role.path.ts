const root = '/roles'

export const rolePath = {
  index: root,
  form: `${root}/save`,
  edit: (id?: string) => `${root}/save/${id || ':id'}`,
  id: (id?: string) => `${root}/${id || ':id'}`,
  import: `${root}/sheet/import`,
  export: `${root}/sheet/export`,
}

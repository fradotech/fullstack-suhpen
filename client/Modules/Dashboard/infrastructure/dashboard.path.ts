const root = '/dashboard'

export const dashboardPath = {
  index: root,
  inventory: {
    aggregate: (field: string) => `${root}/inventories/aggregate/${field}`,
  },
}

import { Modules } from '../../../../@server/modules/modules'

const root = `/${Modules.Dashboard}`

export const dashboardPath = {
  index: root,
  inventory: {
    aggregate: (field: string) => `${root}/inventories/aggregate/${field}`,
  },
}

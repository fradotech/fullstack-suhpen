import { Modules } from '../../../../@server/modules/modules'

const root = `/${Modules.Dashboard}`
const rootInvenory = `/${Modules.DashboardInventory}`

export const dashboardPath = {
  index: root,
  inventory: {
    aggregate: (field: string) => `${rootInvenory}/aggregate/${field}`,
  },
}

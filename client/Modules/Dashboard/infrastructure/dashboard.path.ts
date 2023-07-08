import { Modules } from '../../../../@server/modules/modules'

const root = `/${Modules.Dashboard}`
const rootInvenory = `/${Modules.DashboardVariant}`

export const dashboardPath = {
  index: root,
  variant: {
    aggregate: (field?: string) => `${rootInvenory}/aggregate/${field || ''}`,
  },
}

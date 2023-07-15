import { Modules } from '../../../../@server/modules/modules'

const root = `/${Modules.Dashboard}`
const rootUser = `/${Modules.DashboardUser}`

export const dashboardPath = {
  index: root,
  user: {
    aggregate: (field?: string) => `${rootUser}/aggregate/${field || ''}`,
  },
}

import { Modules } from '../../../../@server/modules/modules'

const index = `/${Modules.Dashboard}`
const rootUser = `/${Modules.DashboardUser}`

export const dashboardPath = {
  index,
  user: {
    aggregate: (field?: string) => `${rootUser}/aggregate/${field || ''}`,
  },
}

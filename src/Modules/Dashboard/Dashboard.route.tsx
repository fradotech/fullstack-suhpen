import React from 'react'
import { Route } from 'react-router-dom'
const Dashboard = React.lazy(() => import('./Dashboard'))

const path = '/dashboard'

export const routesDashboard = {
  dashboard: {
    index: path,
    inventory: {
      aggregate: (field: string) => `${path}/inventories/aggregate/${field}`,
    },
  },
}

export default [
  <Route
    key={routesDashboard.dashboard.index}
    path={routesDashboard.dashboard.index}
    element={<Dashboard />}
  />,
]

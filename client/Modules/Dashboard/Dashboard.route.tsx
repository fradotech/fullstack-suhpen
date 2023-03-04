import React from 'react'
import { Route } from 'react-router-dom'
const Dashboard = React.lazy(() => import('./Dashboard'))

export const routesDashboard = {
  Dashboard: '/dashboard',
}

export default [
  <Route
    key={routesDashboard.Dashboard}
    path={routesDashboard.Dashboard}
    element={<Dashboard />}
  />,
]

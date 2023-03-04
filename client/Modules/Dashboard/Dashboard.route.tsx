import React, { lazy } from 'react'
import { Route } from 'react-router-dom'
const Dashboard = lazy(() => import('./Dashboard'))

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

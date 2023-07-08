import { Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import { dashboardPath } from './infrastructure/dashboard.path'

const path = dashboardPath

export default [
  <Route key={path.index} path={path.index} element={<Dashboard />} />,
]

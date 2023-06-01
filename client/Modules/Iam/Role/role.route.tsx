import { Route } from 'react-router-dom'
import RoleIndex from './Pages/Role.Index'

const path = '/roles'

export const routesRole = {
  role: path,
}

export default [
  <Route
    key={routesRole.role}
    path={routesRole.role}
    element={<RoleIndex />}
  />,
]

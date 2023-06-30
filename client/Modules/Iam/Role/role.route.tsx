import { Route } from 'react-router-dom'
import RoleDetail from './Pages/Role.Detail'
import RoleForm from './Pages/Role.Form'
import RoleIndex from './Pages/Role.Index'

const path = '/roles'

export const routesRole = {
  role: {
    index: path,
    form: `${path}/save`,
    edit: (id?: string) => `${path}/save/${id || ':id'}`,
    id: (id?: string) => `${path}/${id || ':id'}`,
    import: `${path}/sheet/import`,
    export: `${path}/sheet/export`,
  },
}

export default [
  <Route
    key={routesRole.role.index}
    path={routesRole.role.index}
    element={<RoleIndex />}
  />,
  <Route
    key={routesRole.role.form}
    path={routesRole.role.form}
    element={<RoleForm />}
  />,
  <Route
    key={routesRole.role.id()}
    path={routesRole.role.id()}
    element={<RoleDetail />}
  />,
  <Route
    key={routesRole.role.edit()}
    path={routesRole.role.edit()}
    element={<RoleForm />}
  />,
]

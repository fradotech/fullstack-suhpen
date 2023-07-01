import { Route } from 'react-router-dom'
import PermissionDetail from './Pages/Permission.Detail'
import PermissionForm from './Pages/Permission.Form'
import PermissionIndex from './Pages/Permission.Index'

const path = '/permissions'

export const routesPermission = {
  permission: {
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
    key={routesPermission.permission.index}
    path={routesPermission.permission.index}
    element={<PermissionIndex />}
  />,
  <Route
    key={routesPermission.permission.form}
    path={routesPermission.permission.form}
    element={<PermissionForm />}
  />,
  <Route
    key={routesPermission.permission.id()}
    path={routesPermission.permission.id()}
    element={<PermissionDetail />}
  />,
  <Route
    key={routesPermission.permission.edit()}
    path={routesPermission.permission.edit()}
    element={<PermissionForm />}
  />,
]

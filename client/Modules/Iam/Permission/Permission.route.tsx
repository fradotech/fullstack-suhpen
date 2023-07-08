import { Route } from 'react-router-dom'
import PermissionDetail from './Pages/Permission.Detail'
import PermissionForm from './Pages/Permission.Form'
import PermissionIndex from './Pages/Permission.Index'
import { permissionPath } from './infrastructure/permission.path'

const path = permissionPath

export default [
  <Route key={path.index} path={path.index} element={<PermissionIndex />} />,
  <Route key={path.form} path={path.form} element={<PermissionForm />} />,
  <Route key={path.id()} path={path.id()} element={<PermissionDetail />} />,
  <Route key={path.edit()} path={path.edit()} element={<PermissionForm />} />,
]

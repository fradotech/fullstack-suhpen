import { Route } from 'react-router-dom'
import RoleDetail from './Pages/Role.Detail'
import RoleForm from './Pages/Role.Form'
import RoleIndex from './Pages/Role.Index'
import { rolePath } from './infrastructure/role.path'

const path = rolePath

export default [
  <Route key={path.index} path={path.index} element={<RoleIndex />} />,
  <Route key={path.form} path={path.form} element={<RoleForm />} />,
  <Route key={path.id()} path={path.id()} element={<RoleDetail />} />,
  <Route key={path.edit()} path={path.edit()} element={<RoleForm />} />,
]

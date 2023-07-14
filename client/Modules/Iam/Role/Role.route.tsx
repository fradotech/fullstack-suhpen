import { Route } from 'react-router-dom'
import RoleForm from './Pages/Role.Form'
import RoleIndex from './Pages/Role.Index'
import { rolePath } from './infrastructure/role.path'

const path = rolePath

export default [
  <Route key={path.index} path={path.index} element={<RoleIndex />} />,
  <Route key={path.form} path={path.form} element={<RoleForm />} />,
  <Route key={path.id()} path={path.id()} element={<RoleForm />} />,
]

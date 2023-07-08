import { Route } from 'react-router-dom'
import UserDetail from './Pages/User.Detail'
import UserForm from './Pages/User.Form'
import UserIndex from './Pages/User.Index'
import { userPath } from './infrastructure/user.path'

const path = userPath

export default [
  <Route key={path.index} path={path.index} element={<UserIndex />} />,
  <Route key={path.form} path={path.form} element={<UserForm />} />,
  <Route key={path.id()} path={path.id()} element={<UserDetail />} />,
  <Route key={path.edit()} path={path.edit()} element={<UserForm />} />,
]

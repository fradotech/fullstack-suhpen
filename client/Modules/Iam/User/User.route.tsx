import { Route } from 'react-router-dom'
import UserForm from './Pages/User.Form'
import UserIndex from './Pages/User.Index'
import { userPath } from './infrastructure/user.path'

const path = userPath

export default [
  <Route key={path.index} path={path.index} element={<UserIndex />} />,
  <Route key={path.form} path={path.form} element={<UserForm />} />,
  <Route key={path.id()} path={path.id()} element={<UserForm />} />,
]

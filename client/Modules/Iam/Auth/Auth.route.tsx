import { Route } from 'react-router-dom'
import LoginForm from './Pages/Login.Form'
import PasswordSendForm from './Pages/PasswordSend.Form'
import PasswordChangeForm from './Pages/PasswordSendChange.Form'
import RegisterForm from './Pages/Register.Form'
import { authPath } from './infrastructure/auth.path'

const path = authPath

export default [
  <Route key={path.login} path={path.login} element={<LoginForm />} />,
  <Route key={path.register} path={path.register} element={<RegisterForm />} />,
  <Route
    key={path.passwordSend}
    path={path.passwordSend}
    element={<PasswordSendForm />}
  />,
  <Route
    key={path.password}
    path={path.password}
    element={<PasswordChangeForm />}
  />,
]

import { Route } from 'react-router-dom'
import LoginForm from './Pages/Login.Form'
import PasswordSendForm from './Pages/PasswordSend.Form'
import PasswordChangeForm from './Pages/PasswordSendChange.Form'
import RegisterForm from './Pages/Register.Form'

const path = '/auth'

export const routesAuth = {
  login: `${path}/login`,
  register: `${path}/register`,
  logout: `${path}/logout`,
  password: `${path}/password`,
  passwordSend: `${path}/password/send`,
  passwordChange: `${path}/password/change`,
}

export default [
  <Route
    key={routesAuth.login}
    path={routesAuth.login}
    element={<LoginForm />}
  />,
  <Route
    key={routesAuth.register}
    path={routesAuth.register}
    element={<RegisterForm />}
  />,
  <Route
    key={routesAuth.passwordSend}
    path={routesAuth.passwordSend}
    element={<PasswordSendForm />}
  />,
  <Route
    key={routesAuth.password}
    path={routesAuth.password}
    element={<PasswordChangeForm />}
  />,
]

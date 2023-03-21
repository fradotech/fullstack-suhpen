import React from 'react'
import { Route } from 'react-router-dom'
import PasswordSendForm from './PasswordSend.Form'
import PasswordChangeForm from './PasswordSendChange.Form'

const LoginForm = React.lazy(() => import('./Login.Form'))
const RegisterForm = React.lazy(() => import('./Register.Form'))

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

import React from 'react'
import { Route } from 'react-router-dom'

const LoginForm = React.lazy(() => import('./Login.Form'))
const RegisterForm = React.lazy(() => import('./Register.Form'))

const path = '/auth'

export const routesAuth = {
  login: `${path}/login`,
  register: `${path}/register`,
  logout: `${path}/logout`,
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
]

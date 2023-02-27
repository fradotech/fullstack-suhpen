import React from 'react'
import { Route } from 'react-router-dom'
import LoginForm from './Login.Form'
import RegisterForm from './Register.Form'

export const routesAuth = {
  Login: '/auth/login',
  Register: '/auth/register',
  Logout: '/auth/logout',
}

export default [
  <Route
    key={routesAuth.Login}
    path={routesAuth.Login}
    element={<LoginForm />}
  />,
  <Route
    key={routesAuth.Register}
    path={routesAuth.Register}
    element={<RegisterForm />}
  />,
]

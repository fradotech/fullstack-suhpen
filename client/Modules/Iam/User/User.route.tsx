import React from 'react'
import { Route } from 'react-router-dom'

const UserDetail = React.lazy(() => import('./User.Detail'))
const UserForm = React.lazy(() => import('./User.Form'))
const UserS = React.lazy(() => import('./User.S'))

const path = '/users'

export const routesUser = {
  users: path,
  user: {
    form: `${path}/save`,
    edit: (id?: string) => `${path}/save/${id || ':id'}`,
    detail: (id?: string) => `${path}/${id || ':id'}`,
    export: `${path}/export`,
  },
}

export default [
  <Route key={routesUser.users} path={routesUser.users} element={<UserS />} />,
  <Route
    key={routesUser.user.form}
    path={routesUser.user.form}
    element={<UserForm />}
  />,
  <Route
    key={routesUser.user.detail()}
    path={routesUser.user.detail()}
    element={<UserDetail />}
  />,
  <Route
    key={routesUser.user.edit()}
    path={routesUser.user.edit()}
    element={<UserForm />}
  />,
]

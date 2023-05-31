import React from 'react'
import { Route } from 'react-router-dom'

const UserDetail = React.lazy(() => import('./User.Detail'))
const UserForm = React.lazy(() => import('./User.Form'))
const UserS = React.lazy(() => import('./User.Index'))

const path = '/users'

export const routesUser = {
  user: {
    index: path,
    form: `${path}/save`,
    edit: (id?: string) => `${path}/save/${id || ':id'}`,
    id: (id?: string) => `${path}/${id || ':id'}`,
    import: `${path}/sheet/import`,
    export: `${path}/sheet/export`,
  },
}

export default [
  <Route
    key={routesUser.user.index}
    path={routesUser.user.index}
    element={<UserS />}
  />,
  <Route
    key={routesUser.user.form}
    path={routesUser.user.form}
    element={<UserForm />}
  />,
  <Route
    key={routesUser.user.id()}
    path={routesUser.user.id()}
    element={<UserDetail />}
  />,
  <Route
    key={routesUser.user.edit()}
    path={routesUser.user.edit()}
    element={<UserForm />}
  />,
]

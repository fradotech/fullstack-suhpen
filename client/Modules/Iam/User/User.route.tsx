import React, { lazy } from 'react'
import { Route } from 'react-router-dom'

const UserDetail = lazy(() => import('./User.Detail'))
const UserForm = lazy(() => import('./User.Form'))
const UserS = lazy(() => import('./User.S'))

export const routesUser = {
  Users: '/users',
  UserDetail: '/users/:id',
  UserForm: '/users/save',
  UserEdit: '/users/save/:id',
}

export default [
  <Route key={routesUser.Users} path={routesUser.Users} element={<UserS />} />,
  <Route
    key={routesUser.UserForm}
    path={routesUser.UserForm}
    element={<UserForm />}
  />,
  <Route
    key={routesUser.UserDetail}
    path={routesUser.UserDetail}
    element={<UserDetail />}
  />,
  <Route
    key={routesUser.UserEdit}
    path={routesUser.UserEdit}
    element={<UserForm />}
  />,
]

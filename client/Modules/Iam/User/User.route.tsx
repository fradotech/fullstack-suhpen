import React from 'react'
import { Route } from 'react-router-dom'
import UserDetail from './User.Detail'
import UserForm from './User.Form'
import UserS from './User.S'

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

import React from 'react'
import { Route } from 'react-router-dom'

const RoleS = React.lazy(() => import('./Role.S'))

export const routesRole = {
  Roles: '/roles',
}

export default [
  <Route key={routesRole.Roles} path={routesRole.Roles} element={<RoleS />} />,
]

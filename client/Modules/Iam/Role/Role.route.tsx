import React from 'react'
import { Route } from 'react-router-dom'

const RoleS = React.lazy(() => import('./Role.S'))

const path = '/roles'

export const routesRole = {
  roles: path,
}

export default [
  <Route key={routesRole.roles} path={routesRole.roles} element={<RoleS />} />,
]

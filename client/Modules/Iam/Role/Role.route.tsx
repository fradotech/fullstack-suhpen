import React from 'react'
import { Route } from 'react-router-dom'

const RoleS = React.lazy(() => import('./Role.S'))

const path = '/roles'

export const routesRole = {
  role: path,
}

export default [
  <Route key={routesRole.role} path={routesRole.role} element={<RoleS />} />,
]

import React from 'react'
import { Route } from 'react-router-dom'

const ProfileDetail = React.lazy(() => import('./Profile.Detail'))
const ProfileForm = React.lazy(() => import('./Profile.Form'))

export const routesProfile = {
  Profile: '/profile',
  ProfileEdit: '/profile/edit',
}

export default [
  <Route
    key={routesProfile.Profile}
    path={routesProfile.Profile}
    element={<ProfileDetail />}
  />,
  <Route
    key={routesProfile.ProfileEdit}
    path={routesProfile.ProfileEdit}
    element={<ProfileForm />}
  />,
]

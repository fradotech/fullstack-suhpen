import React from 'react'
import { Route } from 'react-router-dom'
import ProfileDetail from './Profile.Detail'

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
    element={<ProfileDetail />}
  />,
]

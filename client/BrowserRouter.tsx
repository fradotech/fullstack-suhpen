import React from 'react'
import {
  BrowserRouter as ReactBrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import { Route as ERoute } from './Enums/Route'
import LayoutMain from './Layouts/MainLayout/LayoutMain'
import DashboardRoute from './Modules/Dashboard/Dashboard.route'
import Home from './Modules/Home'
import { authAction } from './Modules/Iam/Auth/auth.action'
import AuthRoute from './Modules/Iam/Auth/Auth.route'
import ProfileRoute from './Modules/Iam/Profile/Profile.route'
import RoleRoute from './Modules/Iam/Role/Role.route'
import UserRoute from './Modules/Iam/User/User.route'
import NotFound from './Modules/NotFound'
import Unauthorized from './Modules/Unauthorized'

const user = authAction.loggedUser()

const BrowserRouter: React.FC = () => (
  <ReactBrowserRouter>
    <Routes>
      <Route path={ERoute.Home} element={<Home />} />
      {AuthRoute}
      {!user && <Route path="*" element={<Unauthorized />} />}
    </Routes>

    {user && location.pathname != ERoute.Home && (
      <LayoutMain>
        <Routes>
          {DashboardRoute}
          {ProfileRoute}
          {UserRoute}
          {RoleRoute}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutMain>
    )}
  </ReactBrowserRouter>
)

export default BrowserRouter

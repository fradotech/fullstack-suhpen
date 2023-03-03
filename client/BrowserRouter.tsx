import React, { lazy, Suspense } from 'react'
import {
  BrowserRouter as ReactBrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import { Route as ERoute } from './Enums/Route'
import LayoutMain from './Layouts/MainLayout/LayoutMain'
import DashboardRoute from './Modules/Dashboard/Dashboard.route'
import FeatureRoute from './Modules/Feature/Feature.route'
import Home from './Modules/Home/Home'
import { authAction } from './Modules/Iam/Auth/auth.action'
import AuthRoute from './Modules/Iam/Auth/Auth.route'
import IamRouter from './Modules/Iam/Iam.router'
import NotFound from './Modules/NotFound'
import Unauthorized from './Modules/Unauthorized'

// Declare Page for Lazy react
// const Home = lazy(() => import('./Modules/Home'))

const user = authAction.loggedUser()

const BrowserRouter: React.FC = () => (
  <ReactBrowserRouter>
    <Routes>
      <Route
        path={ERoute.Home}
        element={
          <Suspense fallback="loading....">
            <Home />
          </Suspense>
        }
      />
      {AuthRoute}
      {!user && <Route path="*" element={<Unauthorized />} />}
    </Routes>

    {user && location.pathname != ERoute.Home && (
      <LayoutMain>
        <Routes>
          {DashboardRoute}
          {IamRouter}
          {FeatureRoute}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutMain>
    )}
  </ReactBrowserRouter>
)

export default BrowserRouter

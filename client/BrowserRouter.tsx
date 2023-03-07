import React from 'react'
import {
  BrowserRouter as ReactBrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import LoaderPage from './Components/Molecules/Loader/LoaderPage'
import { Route as ERoute } from './Enums/Route'
import DashboardRoute from './Modules/Dashboard/Dashboard.route'
import FeatureRoute from './Modules/Feature/Feature.route'
import { authAction } from './Modules/Iam/Auth/auth.action'
import AuthRoute from './Modules/Iam/Auth/Auth.route'
import IamRoute from './Modules/Iam/Iam.route'

const LayoutMain = React.lazy(() => import('./Layouts/LayoutMain/LayoutMain'))
const Home = React.lazy(() => import('./Modules/Home/Home'))
const NotFound = React.lazy(() => import('./Modules/NotFound'))
const Unauthorized = React.lazy(() => import('./Modules/Unauthorized'))

const user = authAction.loggedUser()
const noGuardRoutes = [ERoute.Home]

const BrowserRouter: React.FC = () => (
  <ReactBrowserRouter>
    <React.Suspense fallback={<LoaderPage />}>
      <Routes>
        <Route path={ERoute.Home} element={<Home />} />
        {AuthRoute}
        {!user && <Route path="*" element={<Unauthorized />} />}
      </Routes>
    </React.Suspense>

    {user && !noGuardRoutes.includes(location.pathname) && (
      <LayoutMain>
        <React.Suspense fallback={<LoaderPage />}>
          <Routes>
            {DashboardRoute}
            {IamRoute}
            {FeatureRoute}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      </LayoutMain>
    )}
  </ReactBrowserRouter>
)

export default BrowserRouter

import React from 'react'
import {
  BrowserRouter as ReactBrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import Loading from './Components/Molecules/Loading/Loading'
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
const noGuardRouters = [
  <Route key={ERoute.Home} path={ERoute.Home} element={<Home />} />,
  ...AuthRoute,
]

const BrowserRouter: React.FC = () => (
  <ReactBrowserRouter>
    {!user && (
      <React.Suspense fallback={<Loading isLoading={true} />}>
        <Routes>
          {noGuardRouters}
          {<Route path="*" element={<Unauthorized />} />}
        </Routes>
      </React.Suspense>
    )}

    {user && !noGuardRoutes.includes(location.pathname) && (
      <LayoutMain>
        <React.Suspense fallback={<Loading isLoading={true} />}>
          <Routes>
            {noGuardRouters}
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

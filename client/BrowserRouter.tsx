import React from 'react'
import {
  BrowserRouter as ReactBrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import Loading from './Components/Molecules/Loading/Loading'
import DashboardRoute from './Modules/Dashboard/Dashboard.route'
import FeatureRoute from './Modules/Feature/Feature.route'
import AuthRoute from './Modules/Iam/Auth/Auth.route'
import { AuthAction } from './Modules/Iam/Auth/infrastructure/auth.action'
import IamRoute from './Modules/Iam/Iam.route'
import { Path as ERoute } from './common/Path'

const LayoutMain = React.lazy(() => import('./Layouts/LayoutMain/LayoutMain'))
const Home = React.lazy(() => import('./Modules/Home/Home'))
const NotFound = React.lazy(() => import('./Modules/NotFound'))
const Unauthorized = React.lazy(() => import('./Modules/Unauthorized'))

const user = AuthAction.loggedUser()
const noGuardRoutes = [ERoute.Home]
const noGuardRouters = [
  <Route key={ERoute.Home} path={ERoute.Home} element={<Home />} />,
  ...AuthRoute,
]

const BrowserRouter: React.FC = () => (
  <ReactBrowserRouter>
    {!user && (
      <React.Suspense fallback={<Loading isLoading />}>
        <Routes>
          {noGuardRouters}
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </React.Suspense>
    )}

    {user && (
      <React.Suspense fallback={<Loading isLoading />}>
        {noGuardRoutes.includes(location.pathname) && (
          <Routes>{noGuardRouters}</Routes>
        )}
        {!noGuardRoutes.includes(location.pathname) && (
          <LayoutMain>
            <Routes>
              {DashboardRoute}
              {IamRoute}
              {FeatureRoute}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LayoutMain>
        )}
      </React.Suspense>
    )}
  </ReactBrowserRouter>
)

export default BrowserRouter

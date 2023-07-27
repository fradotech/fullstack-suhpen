import React from 'react'
import {
  BrowserRouter as ReactBrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import Loading from './Components/Molecules/Loading/Loading'
import DashboardModule from './Modules/Dashboard/Dashboard.Module'
import AuthModule from './Modules/Iam/Auth/Auth.Module'
import { AuthAction } from './Modules/Iam/Auth/infrastructure/auth.action'
import IamModule from './Modules/Iam/Iam.Module'
import NotificationModule from './Modules/Notification/Notification.Module'
import { Path as ERoute } from './common/Path'

const LayoutMain = React.lazy(() => import('./Layouts/LayoutMain/LayoutMain'))
const Home = React.lazy(() => import('./Modules/Home/Home'))
const NotFound = React.lazy(() => import('./Modules/NotFound'))
const Unauthorized = React.lazy(() => import('./Modules/Unauthorized'))

const user = AuthAction.userLoggedLocal()
const noGuardRoutes = [ERoute.Home]
const noGuardRouters = [
  <Route key={ERoute.Home} path={ERoute.Home} element={<Home />} />,
  ...AuthModule.routes,
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
              {DashboardModule.routes}
              {IamModule.routes}
              {NotificationModule.routes}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LayoutMain>
        )}
      </React.Suspense>
    )}
  </ReactBrowserRouter>
)

export default BrowserRouter

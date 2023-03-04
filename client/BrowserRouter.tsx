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
import { authAction } from './Modules/Iam/Auth/auth.action'
import AuthRoute from './Modules/Iam/Auth/Auth.route'
import IamRouter from './Modules/Iam/Iam.router'
import LoaderPage from './Components/Molecules/Loader/LoaderPage'
import NotFound from './Modules/NotFound'
import Unauthorized from './Modules/Unauthorized'

//Example Declare Page for Lazy react
const Home = lazy(() => import('./Modules/Home/Home'))

const user = authAction.loggedUser()

const BrowserRouter: React.FC = () => (
  <ReactBrowserRouter>
    <Suspense fallback={<LoaderPage />}>
      <Routes>
        <Route path={ERoute.Home} element={<Home />} />
        {AuthRoute}
        {!user && <Route path="*" element={<Unauthorized />} />}
      </Routes>
    </Suspense>

    {user && location.pathname != ERoute.Home && (
      <LayoutMain>
        <Suspense fallback={<LoaderPage />}>
          <Routes>
            {DashboardRoute}
            {IamRouter}
            {FeatureRoute}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </LayoutMain>
    )}
  </ReactBrowserRouter>
)

export default BrowserRouter

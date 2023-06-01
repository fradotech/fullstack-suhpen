import { Route } from 'react-router-dom'
import UserDetail from './Pages/User.Detail'
import UserForm from './Pages/User.Form'
import UserIndex from './Pages/User.Index'

const path = '/users'

export const routesUser = {
  user: {
    index: path,
    form: `${path}/save`,
    edit: (id?: string) => `${path}/save/${id || ':id'}`,
    id: (id?: string) => `${path}/${id || ':id'}`,
    import: `${path}/sheet/import`,
    export: `${path}/sheet/export`,
  },
}

export default [
  <Route
    key={routesUser.user.index}
    path={routesUser.user.index}
    element={<UserIndex />}
  />,
  <Route
    key={routesUser.user.form}
    path={routesUser.user.form}
    element={<UserForm />}
  />,
  <Route
    key={routesUser.user.id()}
    path={routesUser.user.id()}
    element={<UserDetail />}
  />,
  <Route
    key={routesUser.user.edit()}
    path={routesUser.user.edit()}
    element={<UserForm />}
  />,
]

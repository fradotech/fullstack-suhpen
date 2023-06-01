import { Route } from 'react-router-dom'
import AccountDetail from './Pages/Account.Detail'
import AccountForm from './Pages/Account.Form'

const path = '/account'

export const routesAccount = {
  account: path,
  accountEdit: `${path}/edit`,
}

export default [
  <Route
    key={routesAccount.account}
    path={routesAccount.account}
    element={<AccountDetail />}
  />,
  <Route
    key={routesAccount.accountEdit}
    path={routesAccount.accountEdit}
    element={<AccountForm />}
  />,
]

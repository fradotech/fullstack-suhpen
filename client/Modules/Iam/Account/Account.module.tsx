import { Route } from 'react-router-dom'
import AccountDetail from './Pages/Account.Detail'
import AccountForm from './Pages/Account.Form'
import { AccountAction } from './infrastructure/account.action'

const path = '/account'

export const RoutesAccount = {
  account: path,
  accountEdit: `${path}/edit`,
}

const accountAction = new AccountAction(RoutesAccount)

export default [
  <Route
    key={RoutesAccount.account}
    path={RoutesAccount.account}
    element={<AccountDetail accountAction={accountAction} />}
  />,
  <Route
    key={RoutesAccount.accountEdit}
    path={RoutesAccount.accountEdit}
    element={<AccountForm accountAction={accountAction} />}
  />,
]

import { MenuItem } from 'client/Layouts/LayoutMain/LayoutItems'
import { Route } from 'react-router-dom'
import AccountForm from './Pages/Account.Form'
import { accountPath } from './infrastructure/account.path'

const path = accountPath

class AccountModule {
  static menuItems: MenuItem[]

  static routes = [
    <Route key={path.index} path={path.index} element={<AccountForm />} />,
  ]
}

export default AccountModule

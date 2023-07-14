import { Route } from 'react-router-dom'
import AccountForm from './Pages/Account.Form'
import { accountPath } from './infrastructure/account.path'

const path = accountPath

export default [
  <Route key={path.index} path={path.index} element={<AccountForm />} />,
]

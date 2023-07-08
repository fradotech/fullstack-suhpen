import { Route } from 'react-router-dom'
import AccountDetail from './Pages/Account.Detail'
import AccountForm from './Pages/Account.Form'
import { accountPath } from './infrastructure/account.path'

const path = accountPath

export default [
  <Route key={path.index} path={path.index} element={<AccountDetail />} />,
  <Route key={path.edit} path={path.edit} element={<AccountForm />} />,
]

import React from 'react'
import { Route } from 'react-router-dom'

const AccountDetail = React.lazy(() => import('./Account.Detail'))
const AccountForm = React.lazy(() => import('./Account.Form'))

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

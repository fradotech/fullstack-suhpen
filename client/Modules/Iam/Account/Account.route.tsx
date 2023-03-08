import React from 'react'
import { Route } from 'react-router-dom'

const AccountDetail = React.lazy(() => import('./Account.Detail'))
const AccountForm = React.lazy(() => import('./Account.Form'))

export const routesAccount = {
  Account: '/account',
  AccountEdit: '/account/edit',
}

export default [
  <Route
    key={routesAccount.Account}
    path={routesAccount.Account}
    element={<AccountDetail />}
  />,
  <Route
    key={routesAccount.AccountEdit}
    path={routesAccount.AccountEdit}
    element={<AccountForm />}
  />,
]

import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../../../common/Path'
import { AccountAction } from '../../Account/infrastructure/account.action'
import { AuthAction } from '../infrastructure/auth.action'

const useAuthGuard = () => {
  const navigate = useNavigate()
  const userLocal = AuthAction.userLoggedLocal()

  const fetch = async () => await AccountAction.userLoggedServer()
  const { data } = useQuery([useAuthGuard.name], fetch)

  React.useEffect(() => {
    !userLocal && navigate(Path.login)
    userLocal && navigate(location.pathname)
  }, [])

  return { user: data?.data || userLocal }
}

export default useAuthGuard

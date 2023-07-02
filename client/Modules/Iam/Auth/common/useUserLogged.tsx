import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../../../common/Path'
import { AccountAction } from '../../Account/infrastructure/account.action'

const useUserLogged = () => {
  const navigate = useNavigate()
  const fetch = async () => await AccountAction.userLoggedServer()
  const { data } = useQuery([useUserLogged.name], fetch)

  React.useEffect(() => {
    !data?.data && navigate(Path.login)
    data?.data && navigate(location.pathname)
  }, [data])

  return { user: data?.data }
}

export default useUserLogged

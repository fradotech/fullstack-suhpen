import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Route } from '../../../../Enums/Route'
import { AuthAction } from '../../Auth/infrastructure/auth.action'

const useUser = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    !AuthAction.loggedUser() && navigate(Route.login)
    AuthAction.loggedUser() && navigate(window.location.pathname)
  }, [navigate])

  return { user: AuthAction.loggedUser() }
}

export default useUser

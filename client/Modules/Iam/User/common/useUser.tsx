import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Route } from '../../../../Enums/Route'
import { authAction } from '../../Auth/auth.action'

const useUser = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    !authAction.loggedUser() && navigate(Route.login)
    authAction.loggedUser() && navigate(window.location.pathname)
  }, [navigate])

  return { user: authAction.loggedUser() }
}

export default useUser

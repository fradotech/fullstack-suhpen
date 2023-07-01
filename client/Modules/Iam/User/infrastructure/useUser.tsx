import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../../../Enums/Path'
import { AuthAction } from '../../Auth/infrastructure/auth.action'

const useUser = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    !AuthAction.loggedUser() && navigate(Path.login)
    AuthAction.loggedUser() && navigate(window.location.pathname)
  }, [navigate])

  return { user: AuthAction.loggedUser() }
}

export default useUser

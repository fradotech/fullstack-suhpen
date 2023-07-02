import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../../../common/Path'
import { AuthAction } from '../infrastructure/auth.action'

const useAuthGuard = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    !AuthAction.loggedUser() && navigate(Path.login)
    AuthAction.loggedUser() && navigate(window.location.pathname)
  }, [])

  return { user: AuthAction.loggedUser() }
}

export default useAuthGuard

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Path } from '../../../../common/Path'
import { AuthAction } from '../infrastructure/auth.action'

const useAuthGuard = () => {
  const navigate = useNavigate()
  const user = AuthAction.userLoggedLocal()

  React.useEffect(() => {
    !user && navigate(Path.login)
    user && navigate(location.pathname)
  }, [])

  return { user }
}

export default useAuthGuard

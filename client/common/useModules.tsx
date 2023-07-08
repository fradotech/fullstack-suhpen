import React from 'react'
import { Modules } from '../../@server/modules/modules'

const useModules = () => {
  const modules = React.useMemo(() => {
    return Object.values(Modules).find((module) => {
      return location.pathname.includes(module)
    })
  }, [])

  return { modules }
}

export default useModules

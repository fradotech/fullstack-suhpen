import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Route } from '../Enums/Route'

const Unauthorized: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="403"
      title="403"
      subTitle="Unauthorized"
      extra={
        <Button onClick={() => navigate(Route.login)} type="primary">
          Login
        </Button>
      }
    />
  )
}
export default Unauthorized

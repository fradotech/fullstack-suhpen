import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Route } from '../Enums/Route'

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => navigate(Route.dashboard.index)} type="primary">
          Go To Dashboard
        </Button>
      }
    />
  )
}
export default NotFound

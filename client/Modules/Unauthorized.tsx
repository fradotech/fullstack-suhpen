import { Button, Result } from 'antd'
import React from 'react'
import { Route } from '../Enums/Route'

const Unauthorized: React.FC = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Unauthorized"
      extra={
        <Button href={Route.login} type="primary">
          Login
        </Button>
      }
    />
  )
}
export default Unauthorized

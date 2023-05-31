import { Button, Result } from 'antd'
import React from 'react'
import { Route } from '../Enums/Route'

const NotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button href={Route.dashboard.index} type="primary">
          Go To Dashboard
        </Button>
      }
    />
  )
}
export default NotFound

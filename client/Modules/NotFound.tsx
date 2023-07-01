import { Button, Result } from 'antd'
import React from 'react'
import { Path } from '../common/Path'

const NotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button href={Path.dashboard.index} type="primary">
          Go To Dashboard
        </Button>
      }
    />
  )
}
export default NotFound

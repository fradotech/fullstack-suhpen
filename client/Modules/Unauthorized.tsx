import { Button, Result } from 'antd'
import React from 'react'
import { Path } from '../Enums/Path'

const Unauthorized: React.FC = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Unauthorized"
      extra={
        <Button href={Path.login} type="primary">
          Login
        </Button>
      }
    />
  )
}
export default Unauthorized

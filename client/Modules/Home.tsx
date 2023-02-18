import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Route } from '../Enums/Route'

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Result
      status="500"
      title="500"
      subTitle="Slicing Home"
      extra={
        <Button onClick={() => navigate(Route.Login)} type="primary">
          Login
        </Button>
      }
    />
  )
}
export default Home

import { AuthLoginRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Button, Card, Col, Form, Image } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organs/Form/FormContainer'
import FormItem from '../../../Components/Organs/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
import { authAction } from './auth.action'

const LoginForm: React.FC = () => {
  const user = authAction.loggedUser()
  const navigate = useNavigate()
  const [form] = Form.useForm<AuthLoginRequest>()
  const [isLoading, setIsLoading] = React.useState(false)

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    try {
      await form.validateFields()
      const user = await authAction.login(data)
      user && location.replace(Route.Dashboard)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  if (user) {
    navigate(Route.Dashboard)
    return undefined
  } else
    return (
      <Col
        style={{
          backgroundColor: '#eeeeee',
          paddingBottom: '92px',
          textAlign: 'center',
        }}
      >
        <Image
          src="https://avatars.githubusercontent.com/u/55073493?v=4"
          preview={false}
          style={{ width: '60%' }}
        />
        <Card
          style={{
            width: '400px',
            margin: 'auto',
            padding: '5px',
            marginTop: '20px',
          }}
        >
          <PageHeader title="Login" />
          <FormContainer
            onFinish={onFinish}
            form={form}
            layout="vertical"
            buttonAction={[
              <a onClick={() => navigate(Route.Register)}>
                Don't have an account? Register
              </a>,
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                Login
              </Button>,
            ]}
          >
            <FormItem name="email" rules={[rule.email]} type="email" />
            <FormItem name="password" input="inputPassword" />
          </FormContainer>
        </Card>
      </Col>
    )
}

export default LoginForm

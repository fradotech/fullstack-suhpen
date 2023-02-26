import { AuthRegisterRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Button, Card, Col, Form, Image, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organs/Form/FormContainer'
import { Route } from '../../../Enums/Route'
import { formRule } from '../../../utils/form.rules'
import { authAction } from './auth.action'

const RegisterForm: React.FC = () => {
  const user = authAction.loggedUser()
  const navigate = useNavigate()
  const [form] = Form.useForm<AuthRegisterRequest>()
  const [isLoading, setIsLoading] = React.useState(false)

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    try {
      await form.validateFields()
      const res = await authAction.register(data)
      res.data && location.replace(Route.Dashboard)
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
          paddingBottom: '45px',
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
          <PageHeader title="Register" />
          <FormContainer
            onFinish={onFinish}
            form={form}
            layout="vertical"
            buttonAction={[
              <a onClick={() => navigate(Route.Login)}>
                Have an account? Login
              </a>,
              <Button type="primary" htmlType="submit" disabled={isLoading}>
                Register
              </Button>,
            ]}
          >
            <Form.Item name="name" required>
              <Input placeholder="Name" />
            </Form.Item>

            <Form.Item name="email" rules={[formRule.email]}>
              <Input placeholder="Email" type="email" />
            </Form.Item>

            <Form.Item name="password" rules={[formRule.password]}>
              <Input.Password placeholder="Password" type="password" />
            </Form.Item>

            <Form.Item name="passwordConfirmation" rules={[formRule.password]}>
              <Input.Password
                placeholder="Password Confirmation"
                type="password"
              />
            </Form.Item>
          </FormContainer>
        </Card>
      </Col>
    )
}

export default RegisterForm

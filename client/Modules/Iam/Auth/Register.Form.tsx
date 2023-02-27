import { AuthRegisterRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Button, Card, Col, Form, Image } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organs/Form/FormContainer'
import FormItem from '../../../Components/Organs/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
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
          paddingBottom: '10px',
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
            <FormItem name="name" required />
            <FormItem name="email" rules={[rule.email]} type="email" />
            <FormItem
              name="password"
              rules={[rule.password]}
              input="inputPassword"
            />
            <FormItem
              name="passwordConfirmation"
              rules={[rule.password]}
              input="inputPassword"
              placeholder="Password Confirmation"
            />
          </FormContainer>
        </Card>
      </Col>
    )
}

export default RegisterForm

import { AuthRegisterRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Card, Col, Form } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CompanyLogo from '../../../Components/Molecules/CompanyLogo/CompanyLogo'
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
          padding: '12px',
          textAlign: 'center',
        }}
      >
        <CompanyLogo />
        <Card
          style={{
            width: '400px',
            margin: 'auto',
            padding: '5px',
            marginTop: '20px',
            marginBottom: '10px',
          }}
        >
          <PageHeader title="Register" />
          <FormContainer
            onFinish={onFinish}
            form={form}
            layout="vertical"
            button={{ singleSubmitText: 'Register', disabled: isLoading }}
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
          <a onClick={() => navigate(Route.Login)}>Have an account? Login</a>
        </Card>
      </Col>
    )
}

export default RegisterForm

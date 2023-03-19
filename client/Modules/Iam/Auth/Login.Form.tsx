import { AuthLoginRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Card, Form } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import CompanyLogo from '../../../Components/Molecules/CompanyLogo/CompanyLogo'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
import { authAction } from './auth.action'
import styles from './Auth.module.css'

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const user = authAction.loggedUser()
  const [form] = Form.useForm<AuthLoginRequest>()

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
    location.replace(Route.Dashboard)
    return undefined
  } else
    return (
      <div className={styles.container}>
        <CompanyLogo />
        <Card className={styles.cardContainer}>
          <PageHeader title="Login" isLoading={isLoading} />
          <FormContainer
            onFinish={onFinish}
            form={form}
            layout="vertical"
            button={{ singleSubmitText: 'Login', disabled: isLoading }}
          >
            <FormItem name="email" rules={[rule.email]} type="email" />
            <FormItem
              name="password"
              input="inputPassword"
              rules={[rule.required]}
            />
          </FormContainer>
          <a onClick={() => navigate(Route.register)}>
            Don't have an account? Register
          </a>
        </Card>
      </div>
    )
}

export default LoginForm

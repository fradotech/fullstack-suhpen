import { AuthRegisterRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Card, Form } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import CompanyLogo from '../../../Components/Molecules/CompanyLogo/CompanyLogo'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
import { authAction } from './auth.action'
import styles from './Auth.module.css'

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const user = authAction.loggedUser()
  const [form] = Form.useForm<AuthRegisterRequest>()

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    const res = await authAction.register(data)
    res.data && location.replace(Route.dashboard.index)
    setIsLoading(false)
  }

  if (user) {
    location.replace(Route.dashboard.index)
    return undefined
  } else
    return (
      <div className={styles.container}>
        <CompanyLogo />
        <Card className={styles.cardContainer}>
          <PageHeader title="Register" isLoading={isLoading} />
          <FormContainer
            onFinish={onFinish}
            form={form}
            layout="vertical"
            button={{ singleSubmitText: 'Register', disabled: isLoading }}
          >
            <FormItem name="name" rules={[rule.required]} />
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
          <Link to={Route.login}>Have an account? Login</Link>
        </Card>
      </div>
    )
}

export default RegisterForm

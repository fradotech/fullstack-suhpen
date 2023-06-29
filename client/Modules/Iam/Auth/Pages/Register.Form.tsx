import { AuthRegisterRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Card, Col, Form } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { Link } from 'react-router-dom'
import CompanyLogo from '../../../../Components/Molecules/CompanyLogo/CompanyLogo'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../../Enums/Route'
import { rule } from '../../../../common/utils/form.rules'
import styles from '../Auth.module.css'
import { AuthAction } from '../infrastructure/auth.action'

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const user = AuthAction.loggedUser()
  const [form] = Form.useForm<AuthRegisterRequest>()

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    const res = await AuthAction.register(data)
    res.data && location.replace(Route.dashboard.index)
    setIsLoading(false)
  }

  if (user) {
    location.replace(Route.dashboard.index)
    return undefined
  } else
    return (
      <Col className={styles.container}>
        <CompanyLogo className={styles.companyLogo} />
        <Card className={styles.cardContainer}>
          <Title className={styles.title}>Register</Title>
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
      </Col>
    )
}

export default RegisterForm

import { AuthLoginRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Card, Col, Form, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { Link } from 'react-router-dom'
import CompanyLogo from '../../../../Components/Molecules/CompanyLogo/CompanyLogo'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../../Enums/Route'
import { rule } from '../../../../common/utils/form.rules'
import styles from '../Auth.module.css'
import { authAction } from '../infrastructure/auth.action'

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const user = authAction.loggedUser()
  const [form] = Form.useForm<AuthLoginRequest>()

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    const user = await authAction.login(data)
    user && location.replace(Route.dashboard.index)
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
          <Title className={styles.title}>Login</Title>
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
          <Row style={{ justifyContent: 'space-between' }}>
            <Link to={Route.passwordSend}>Forgot password?</Link>
            <Link to={Route.register}>Don't have an account? Register</Link>
          </Row>
        </Card>
      </Col>
    )
}

export default LoginForm

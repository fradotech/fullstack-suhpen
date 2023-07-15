import { AuthLoginRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Button, Card, Col, Form, Row } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { Link } from 'react-router-dom'
import CompanyLogo from '../../../../Components/Molecules/CompanyLogo/CompanyLogo'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { Path } from '../../../../common/Path'
import { rule } from '../../../../common/utils/form.rules'
import styles from '../Auth.module.css'
import { AuthAction } from '../infrastructure/auth.action'

const LoginForm: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState(false)
  const user = AuthAction.userLoggedLocal()
  const [form] = Form.useForm<AuthLoginRequest>()

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    const user = await AuthAction.login(data)
    user && location.replace(Path.dashboard.index)
    setIsLoading(false)
  }

  if (user) {
    location.replace(Path.dashboard.index)
    return <></>
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
            button={{
              buttonActions: [
                <Button
                  disabled={isLoading}
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  Login
                </Button>,
              ],
            }}
          >
            <FormItem name="email" rules={[rule.email]} type="email" />
            <FormItem
              name="password"
              input="inputPassword"
              rules={[rule.required]}
            />
          </FormContainer>
          <Row style={{ justifyContent: 'space-between' }}>
            <Link to={Path.passwordSend}>Forgot password?</Link>
            <Link to={Path.register}>Don't have an account? Register</Link>
          </Row>
        </Card>
      </Col>
    )
}

export default LoginForm

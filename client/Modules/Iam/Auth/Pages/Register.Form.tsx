import { AuthRegisterRequest } from '@server/modules/iam/auth/v1/auth.request'
import { Button, Card, Col, Form } from 'antd'
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

const RegisterForm: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState(false)
  const user = AuthAction.userLoggedLocal()
  const [form] = Form.useForm<AuthRegisterRequest>()

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    const user = await AuthAction.register(data)
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
          <Title className={styles.title}>Register</Title>
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
                  Register
                </Button>,
              ],
            }}
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
          <Link to={Path.login}>Have an account? Login</Link>
        </Card>
      </Col>
    )
}

export default RegisterForm

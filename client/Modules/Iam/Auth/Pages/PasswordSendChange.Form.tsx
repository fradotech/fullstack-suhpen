import { AuthPasswordChangeRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Alert, Button, Card, Col, Form } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CompanyLogo from '../../../../Components/Molecules/CompanyLogo/CompanyLogo'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { Path } from '../../../../common/Path'
import { rule } from '../../../../common/utils/form.rules'
import styles from '../Auth.module.css'
import { AuthAction } from '../infrastructure/auth.action'

const PasswordChangeForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchParams] = useSearchParams()
  const [form] = Form.useForm<AuthPasswordChangeRequest>()
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isValid, setIsValid] = React.useState<boolean>()
  const token = searchParams.get('token')
  const isValidToken = async () =>
    setIsValid(await AuthAction.password(token || ''))

  React.useEffect(() => {
    isValidToken()
  }, [isValidToken])

  const onFinish = async () => {
    const data = form.getFieldsValue()
    const res = await AuthAction.passwordChange(data, token || '')
    res && setIsSuccess(true)
    setIsLoading(false)
  }

  if (!isValid) {
    isValid === false && location.replace(Path.login)
    return null
  } else
    return (
      <Col className={styles.container}>
        <CompanyLogo className={styles.companyLogo} />
        <Card className={styles.cardContainer}>
          <Title className={styles.title}>Create New Password</Title>
          {isSuccess ? (
            <Col>
              <Alert
                style={{ textAlign: 'left' }}
                message={'Successfull operation!'}
                description="Success reset your password"
                type="success"
                showIcon
              />
              <Link to={Path.login}>Login</Link>
            </Col>
          ) : (
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
                    Submit
                  </Button>,
                ],
              }}
            >
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
          )}
        </Card>
      </Col>
    )
}

export default PasswordChangeForm

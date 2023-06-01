import { AuthPasswordChangeRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Alert, Card, Col, Form } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CompanyLogo from '../../../../Components/Molecules/CompanyLogo/CompanyLogo'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../../Enums/Route'
import { rule } from '../../../../utils/form.rules'
import styles from '../Auth.module.css'
import { authAction } from '../infrastructure/auth.action'

const PasswordChangeForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchParams] = useSearchParams()
  const [form] = Form.useForm<AuthPasswordChangeRequest>()
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isValid, setIsValid] = React.useState<boolean>()
  const token = searchParams.get('token')
  const isValidToken = async () => setIsValid(await authAction.password(token))
  React.useEffect(() => isValidToken() as undefined, [isValidToken])

  const onFinish = async () => {
    const data = form.getFieldsValue()
    const res = await authAction.passwordChange(data, token)
    res && setIsSuccess(true)
    setIsLoading(false)
  }

  if (!isValid) {
    isValid == false && location.replace(Route.login)
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
              <Link to={Route.login}>Login</Link>
            </Col>
          ) : (
            <FormContainer
              onFinish={onFinish}
              form={form}
              layout="vertical"
              button={{ singleSubmitText: 'Submit', disabled: isLoading }}
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

import { AuthPasswordSendRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Alert, Card, Form } from 'antd'
import React from 'react'
import CompanyLogo from '../../../Components/Molecules/CompanyLogo/CompanyLogo'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
import { authAction } from './auth.action'
import styles from './Auth.module.css'

const PasswordSendForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const user = authAction.loggedUser()
  const [form] = Form.useForm<AuthPasswordSendRequest>()
  const [isSuccess, setIsSuccess] = React.useState(false)

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    const res = await authAction.passwordSend(data)
    res && setIsSuccess(true)
    setIsLoading(false)
  }

  if (user) {
    location.replace(Route.Dashboard)
    return undefined
  } else
    return (
      <div className={styles.container}>
        <CompanyLogo />
        <Card className={styles.cardContainer}>
          <PageHeader title="Reset Password" isLoading={isLoading} />
          {isSuccess ? (
            <Alert
              style={{ textAlign: 'left' }}
              message={'Successfull operation!'}
              description={`Success send link reset password to your email ${form.getFieldValue(
                'email',
              )}. Please check your email inbox`}
              type="success"
              showIcon
            />
          ) : (
            <FormContainer
              onFinish={onFinish}
              form={form}
              layout="vertical"
              button={{ singleSubmitText: 'Submit', disabled: isLoading }}
            >
              <FormItem name="email" rules={[rule.email]} type="email" />
            </FormContainer>
          )}
        </Card>
      </div>
    )
}

export default PasswordSendForm

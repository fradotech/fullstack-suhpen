import { AuthPasswordSendRequest } from '@server/modules/iam/auth/v1/auth.request'
import { Alert, Button, Card, Col, Form } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import CompanyLogo from '../../../../Components/Molecules/CompanyLogo/CompanyLogo'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { Path } from '../../../../common/Path'
import { rule } from '../../../../common/utils/form.rules'
import styles from '../Auth.module.css'
import { AuthAction } from '../infrastructure/auth.action'

const PasswordSendForm: React.FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = React.useState(false)
  const user = AuthAction.userLoggedLocal()
  const [form] = Form.useForm<AuthPasswordSendRequest>()
  const [isSuccess, setIsSuccess] = React.useState(false)

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    const res = await AuthAction.passwordSend(data)
    res && setIsSuccess(true)
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
          <Title className={styles.title}>Reset Password</Title>
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
              <FormItem name="email" rules={[rule.email]} type="email" />
            </FormContainer>
          )}
        </Card>
      </Col>
    )
}

export default PasswordSendForm

import { AuthPasswordChangeRequest } from '@server/modules/iam/auth/infrastructure/auth.request'
import { Alert, Card, Form } from 'antd'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import CompanyLogo from '../../../Components/Molecules/CompanyLogo/CompanyLogo'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../Components/Organisms/Form/FormItem'
import { rule } from '../../../utils/form.rules'
import { authAction } from './auth.action'
import styles from './Auth.module.css'

// TODO: Make forbidden validation reset password
// TODO: Slicing center title
const PasswordChangeForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchParams] = useSearchParams()
  const [form] = Form.useForm<AuthPasswordChangeRequest>()
  const [isSuccess, setIsSuccess] = React.useState(false)

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    try {
      await form.validateFields()
      const res = await authAction.passwordChange(
        data,
        searchParams.get('token'),
      )
      res && setIsSuccess(true)
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <CompanyLogo />
      <Card className={styles.cardContainer}>
        <PageHeader title="Create New Password" isLoading={isLoading} />
        {isSuccess ? (
          <Alert
            style={{ textAlign: 'left' }}
            message={'Successfull operation!'}
            description="Success reset your password"
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
            />{' '}
          </FormContainer>
        )}
      </Card>
    </div>
  )
}

export default PasswordChangeForm

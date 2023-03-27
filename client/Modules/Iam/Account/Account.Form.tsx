import { UserUpdateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { Divider, Form } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
import { EUserGender } from '../User/User.enum'
import { accountAction } from './account.action'

const AccountForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm<UserUpdateRequest>()

  useQuery(
    [AccountForm.name],
    async () => {
      setIsLoading(true)
      const res = await accountAction.getUserLogged()
      form.setFieldsValue(res.data)
      setIsLoading(false)
    },
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    const res = await accountAction.update(data)
    setIsLoading(false)
    res.data && navigate(Route.account)
  }

  return (
    <>
      <PageHeader title="Account Edit" isLoading={isLoading} />
      <FormContainer
        onFinish={onFinish}
        form={form}
        layout="vertical"
        centered
        button={{ disabled: isLoading }}
      >
        <FormItem name="avatar" input="attachment" total={1} form={form} />
        <FormItem name="name" rules={[rule.required]} />

        <Divider />

        <FormItem
          name="gender"
          input="select"
          optionsEnum={Object.values(EUserGender)}
        />

        <FormItem name="phoneNumber" />
        <FormItem name="address" />
        <FormItem name="birthDate" input="datePicker" />
      </FormContainer>
    </>
  )
}

export default AccountForm

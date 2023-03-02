import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserCreateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Divider, Form } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organs/Form/FormContainer'
import FormItem from '../../../Components/Organs/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
import { userAction } from './user.action'
import { EUserGender } from './User.enum'

const UserForm: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<UserCreateRequest>()
  const [isLoading, setIsLoading] = React.useState(false)
  const fetch = async () => {
    const res = await userAction.findOne(id)
    form.setFieldsValue(res.data)
    return res
  }

  React.useEffect(() => {
    id && fetch()
  }, [])

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    try {
      let res: IApiRes<UserResponse>
      if (!id) res = await userAction.create(data)
      if (id) res = await userAction.update(id, data)
      setIsLoading(false)
      res.data && navigate(Route.Users)
    } catch (e) {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PageHeader title={id ? 'User Edit' : 'User Create'} />
      <FormContainer
        onFinish={onFinish}
        form={form}
        layout="vertical"
        centered
        button={{ disabled: isLoading }}
      >
        <FormItem name="avatar" input="attachment" total={1} />
        <FormItem name="name" rules={[rule.required]} />

        {!id && (
          <>
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
          </>
        )}

        <Divider />

        <FormItem
          name="gender"
          input="select"
          optionsEnum={Object.values(EUserGender)}
        />

        <FormItem name="phoneNumber" />
        <FormItem name="address" />
        <FormItem name="birthDate" input="datePicker" />
        <FormItem
          name="dateRange"
          input="rangePicker"
          showTime
          format="YYYY-MM-DD HH:mm"
        />
      </FormContainer>
    </>
  )
}

export default UserForm

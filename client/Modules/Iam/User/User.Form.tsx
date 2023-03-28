import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserCreateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
import { Divider, Form } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
import { ERole } from '../Role/common/Role.enum'
import { EUserGender } from './common/User.enum'
import { userAction } from './user.action'

const UserForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<UserCreateRequest>()

  useQuery(
    [UserForm.name],
    id &&
      (async () => {
        setIsLoading(true)
        const res = await userAction.findOne(id)
        form.setFieldsValue(res.data)
        setIsLoading(false)
      }),
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    let res: IApiRes<UserResponse>
    if (!id) res = await userAction.create(data)
    if (id) res = await userAction.update(id, data)
    setIsLoading(false)
    res.data && navigate(Route.user.index)
  }

  return (
    <>
      <PageHeader
        title={id ? 'User Edit' : 'User Create'}
        isLoading={isLoading}
      />
      <FormContainer
        onFinish={onFinish}
        form={form}
        layout="vertical"
        centered
        button={{ disabled: isLoading }}
      >
        <FormItem name="avatar" input="attachment" total={1} form={form} />
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
          name="role"
          input="select"
          optionsEnum={Object.values(ERole)}
        />

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

export default UserForm

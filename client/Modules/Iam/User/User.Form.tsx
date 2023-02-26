import { UserCreateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { Button, Divider, Form, Input } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import Attachment from '../../../Components/Organs/Attachment/Attachment'
import { getAttachment } from '../../../Components/Organs/Attachment/attachment.util'
import FormContainer from '../../../Components/Organs/Form/FormContainer'
import { Route } from '../../../Enums/Route'
import { formRule } from '../../../utils/form.rules'
import { userAction } from './user.action'

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
    data.avatar = getAttachment(data.avatar) as string

    try {
      !id && (await userAction.create(data)) && alert('Success create data')
      id && (await userAction.update(data)) && alert('Success update data')
      setIsLoading(false)
      navigate(Route.Users)
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
        buttonAction={[
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Save
          </Button>,
        ]}
      >
        <Form.Item label="Avatar">
          <Attachment
            total={1}
            name="avatar"
            defaultValues={[form.getFieldsValue().avatar]}
          />
        </Form.Item>

        <Form.Item label="Name" name="name" rules={[formRule.required]}>
          <Input />
        </Form.Item>

        {!id && (
          <>
            <Form.Item label="Email" name="email" rules={[formRule.email]}>
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[formRule.password]}
              required
            >
              <Input.Password type="password" />
            </Form.Item>

            <Form.Item
              label="Password Confirmation"
              name="passwordConfirmation"
              rules={[formRule.password]}
              required
            >
              <Input.Password type="password" />
            </Form.Item>
          </>
        )}

        <Divider />

        <Form.Item label="Phone Number" name="phoneNumber">
          <Input />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
      </FormContainer>
    </>
  )
}

export default UserForm

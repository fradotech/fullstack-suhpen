import { UserUpdateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { Button, Divider, Form, Input } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import Attachment from '../../../Components/Organs/Attachment/Attachment'
import FormContainer from '../../../Components/Organs/Form/FormContainer'
import { Route } from '../../../Enums/Route'
import { formRule } from '../../../utils/form.rules'
import { profileAction } from './profile.action'

const ProfileForm: React.FC = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm<UserUpdateRequest>()
  const [isLoading, setIsLoading] = React.useState(false)
  const fetch = async () => {
    const res = await profileAction.getUserLogged()
    form.setFieldsValue(res.data)
  }

  React.useEffect(() => {
    fetch()
  }, [])

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    try {
      ;(await profileAction.update(data)) && alert('Success update data')
      setIsLoading(false)
      navigate(Route.Profile)
    } catch (e) {
      setIsLoading(false)
    }
  }

  return (
    <>
      <PageHeader title="Profile Edit" />
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
          <Attachment total={1} name="avatar" />
        </Form.Item>

        <Form.Item label="Name" name="name" rules={[formRule.required]}>
          <Input />
        </Form.Item>

        <Form.Item label="Phone Number" name="phoneNumber">
          <Input />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>

        <Divider />
      </FormContainer>
    </>
  )
}

export default ProfileForm

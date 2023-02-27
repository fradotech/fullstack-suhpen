import { UserUpdateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { Button, Form } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organs/Form/FormContainer'
import FormItem from '../../../Components/Organs/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
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
      const res = await profileAction.update(data)
      setIsLoading(false)
      res.data && navigate(Route.Profile)
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
        <FormItem name="avatar" input="attachment" total={1} />
        <FormItem name="name" rules={[rule.required]} />
        <FormItem name="phoneNumber" />
        <FormItem name="address" />
      </FormContainer>
    </>
  )
}

export default ProfileForm

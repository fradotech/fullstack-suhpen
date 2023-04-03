import { UserUpdateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { Col, Form, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../Components/Molecules/Section/Section'
import FormContainer from '../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
import { ERole } from '../Role/Role.enum'
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
      <Section>
        <FormContainer
          onFinish={onFinish}
          form={form}
          layout="vertical"
          centered
          button={{ disabled: isLoading }}
        >
          <FormItem name="avatar" input="attachment" total={1} form={form} />
          <FormItem name="name" rules={[rule.required]} />

          <Row gutter={12}>
            <Col sm={24} md={12}>
              <FormItem
                name="role"
                input="select"
                optionsEnum={Object.values(ERole)}
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem
                name="gender"
                input="select"
                optionsEnum={Object.values(EUserGender)}
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem name="phoneNumber" />
            </Col>
            <Col sm={24} md={12}>
              <FormItem name="birthDate" input="datePicker" />
            </Col>
          </Row>

          <FormItem name="address" />
        </FormContainer>
      </Section>
    </>
  )
}

export default AccountForm

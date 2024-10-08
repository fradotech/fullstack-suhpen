import { UserCreateRequest } from '@server/modules/iam/user/v1/user.request'
import { Col, Divider, Form, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { UserGenderEnum } from '../../../../../@server/modules/iam/user/common/user.enum'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { Path } from '../../../../common/Path'
import { rule } from '../../../../common/utils/form.rules'
import { RoleAction } from '../../Role/infrastructure/role.action'
import { UserAction } from '../infrastructure/user.action'

const UserForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<UserCreateRequest>()

  const fetch = async () => {
    setIsLoading(true)
    const res = await UserAction.findOne(id)
    form.setFieldsValue(res.data)
    setIsLoading(false)
  }

  useQuery([UserForm.name], id ? fetch : () => undefined, {
    refetchOnWindowFocus: false,
  })

  const { data: roles } = RoleAction.useIndex(
    { pageSize: 1000 },
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    if (id) await UserAction.update(id, data)
    else {
      const res = await UserAction.create(data)
      res.data && navigate(Path.user.index)
    }

    setIsLoading(false)
  }

  return (
    <>
      <PageHeader title={id ? 'User' : 'New User'} />
      <Section>
        <FormContainer
          onFinish={onFinish}
          form={form}
          layout="vertical"
          centered
          button={{ disabled: isLoading }}
        >
          <Row gutter={12}>
            <Col sm={24} md={6}>
              <FormItem
                name="avatar"
                input="attachment"
                total={1}
                form={form}
              />
            </Col>
            <Col sm={24} md={18}>
              <FormItem name="name" rules={[rule.required]} />
              <FormItem
                name="email"
                rules={[rule.email]}
                type="email"
                disabled={!!id}
              />
            </Col>

            {!id && (
              <Col sm={24} md={24}>
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
              </Col>
            )}
          </Row>

          <Divider />

          <Row gutter={12}>
            <Col sm={24} md={12}>
              <FormItem
                name="roleIds"
                label="Roles"
                input="selectMultiple"
                options={roles?.data}
                form={form}
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem
                name="gender"
                input="select"
                optionsEnum={Object.values(UserGenderEnum)}
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem name="phoneNumber" />
            </Col>
            <Col sm={24} md={12}>
              <FormItem name="birthDate" input="datePicker" />
            </Col>
          </Row>

          <FormItem name="address" input="textArea" />
        </FormContainer>
      </Section>
    </>
  )
}

export default UserForm

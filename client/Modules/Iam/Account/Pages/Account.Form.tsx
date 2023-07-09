import { Col, Form, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { AccountUpdateRequest } from '../../../../../@server/modules/iam/account/infrastructure/account.request'
import { UserGenderEnum } from '../../../../../@server/modules/iam/user/common/user.enum'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { Path } from '../../../../common/Path'
import { rule } from '../../../../common/utils/form.rules'
import { RoleAction } from '../../Role/infrastructure/role.action'
import { AccountAction } from '../infrastructure/account.action'

const AccountForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm<AccountUpdateRequest>()

  const { isLoading: isLoadingRoles, data: roles } = RoleAction.useIndex()

  useQuery(
    [AccountForm.name],
    async () => {
      setIsLoading(true)
      const res = await AccountAction.userLoggedServer()
      form.setFieldsValue(res.data)
      setIsLoading(false)
    },
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    const res = await AccountAction.update(data)
    setIsLoading(false)
    res.data && navigate(Path.account.index)
  }

  return (
    <>
      <PageHeader
        title="Account Edit"
        isLoading={isLoading || isLoadingRoles}
      />
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
                name="roleIds"
                label="Roles"
                input="selectMultiple"
                options={roles?.data}
                form={form}
                disabled
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

export default AccountForm

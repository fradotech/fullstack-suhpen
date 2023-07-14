import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { UserCreateRequest } from '@server/modules/iam/user/infrastructure/user.request'
import { UserResponse } from '@server/modules/iam/user/infrastructure/user.response'
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

interface IProps {
  isDetail?: boolean
}

const UserForm: React.FC<IProps> = (props: IProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<UserCreateRequest>()

  const { isLoading: isLoadingRoles, data: roles } = RoleAction.useIndex()

  useQuery(
    [UserForm.name],
    id
      ? async () => {
          setIsLoading(true)
          const res = await UserAction.findOne(id)
          form.setFieldsValue(res.data)
          setIsLoading(false)
        }
      : () => undefined,
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    let res: IApiRes<UserResponse> | undefined
    if (!id) res = await UserAction.create(data)
    if (id) res = await UserAction.update(id, data)
    setIsLoading(false)
    res?.data && navigate(Path.user.index)
  }

  return (
    <>
      <PageHeader
        title={id ? 'User Edit' : 'User Create'}
        isLoading={isLoading || isLoadingRoles}
      />
      <Section>
        <FormContainer
          onFinish={onFinish}
          form={form}
          layout="vertical"
          centered
          button={!props.isDetail && { disabled: isLoading }}
          disabled={props.isDetail}
        >
          <FormItem
            isDetail={props.isDetail}
            name="avatar"
            input="attachment"
            total={1}
            form={form}
          />
          <FormItem
            isDetail={props.isDetail}
            name="name"
            rules={[rule.required]}
          />

          {!id && (
            <>
              <FormItem
                isDetail={props.isDetail}
                name="email"
                rules={[rule.email]}
                type="email"
              />
              <FormItem
                isDetail={props.isDetail}
                name="password"
                rules={[rule.password]}
                input="inputPassword"
              />
              <FormItem
                isDetail={props.isDetail}
                name="passwordConfirmation"
                rules={[rule.password]}
                input="inputPassword"
                placeholder="Password Confirmation"
              />
            </>
          )}

          <Divider />

          <Row gutter={12}>
            <Col sm={24} md={12}>
              <FormItem
                isDetail={props.isDetail}
                name="roleIds"
                label="Roles"
                input="selectMultiple"
                options={roles?.data}
                form={form}
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem
                isDetail={props.isDetail}
                name="gender"
                input="select"
                optionsEnum={Object.values(UserGenderEnum)}
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem isDetail={props.isDetail} name="phoneNumber" />
            </Col>
            <Col sm={24} md={12}>
              <FormItem
                isDetail={props.isDetail}
                name="birthDate"
                input="datePicker"
              />
            </Col>
          </Row>

          <FormItem isDetail={props.isDetail} name="address" input="textArea" />
        </FormContainer>
      </Section>
    </>
  )
}

export default UserForm

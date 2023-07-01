import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { PermissionCreateRequest } from '@server/modules/iam/permission/infrastructure/permission.request'
import { PermissionResponse } from '@server/modules/iam/permission/infrastructure/permission.response'
import { Col, Form, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../../Enums/Route'
import { rule } from '../../../../common/utils/form.rules'
import { PermissionAction } from '../infrastructure/permission.action'

const PermissionForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<PermissionCreateRequest>()

  useQuery(
    [PermissionForm.name],
    id &&
      (async () => {
        setIsLoading(true)
        const res = await PermissionAction.findOne(id)
        form.setFieldsValue(res.data)
        setIsLoading(false)
      }),
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    let res: IApiRes<PermissionResponse>
    if (!id) res = await PermissionAction.create(data)
    if (id) res = await PermissionAction.update(id, data)
    setIsLoading(false)
    res.data && navigate(Route.permission.index)
  }

  return (
    <>
      <PageHeader
        title={id ? 'Permission Edit' : 'Permission Create'}
        isLoading={isLoading}
      />
      <Section>
        <FormContainer
          onFinish={onFinish}
          form={form}
          layout="vertical"
          centered
          button={{ disabled: isLoading }}
        >
          <FormItem name="thumbnail" input="attachment" total={1} form={form} />
          <Row gutter={12}>
            <Col sm={24} md={20}>
              <FormItem name="name" rules={[rule.required]} />
            </Col>
            <Col sm={24} md={4}>
              <FormItem
                name="isActive"
                input="switch"
                rules={[rule.required]}
                form={form}
              />
            </Col>
          </Row>
          <FormItem name="key" rules={[rule.required]} />
          <FormItem name="description" input="textArea" />
          <FormItem name="labelColor" input="colorPicker" />
        </FormContainer>
      </Section>
    </>
  )
}

export default PermissionForm

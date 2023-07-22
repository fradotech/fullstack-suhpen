import { NotificationCategoryCreateRequest } from '@server/modules/notification/notification-category/infrastructure/notification-category.request'
import { Col, Form, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { Path } from '../../../../common/Path'
import { rule } from '../../../../common/utils/form.rules'
import { NotificationCategoryAction } from '../infrastructure/notification-category.action'

const NotificationCategoryForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<NotificationCategoryCreateRequest>()

  const fetch = async () => {
    setIsLoading(true)
    const res = await NotificationCategoryAction.findOne(id)
    form.setFieldsValue(res.data)
    setIsLoading(false)
  }

  useQuery([NotificationCategoryForm.name], id ? fetch : () => undefined, {
    refetchOnWindowFocus: false,
  })

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    if (id) await NotificationCategoryAction.update(id, data)
    else {
      const res = await NotificationCategoryAction.create(data)
      res.data && navigate(Path.notificationCategory.index)
    }

    setIsLoading(false)
  }

  return (
    <>
      <PageHeader
        title={id ? 'NotificationCategory' : 'New NotificationCategory'}
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
          <FormItem name="description" input="textArea" />
          <Row gutter={12}>
            <Col sm={24} md={12}>
              <FormItem
                name="thumbnail"
                input="attachment"
                total={1}
                form={form}
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem name="labelColor" input="colorPicker" />
            </Col>
          </Row>
        </FormContainer>
      </Section>
    </>
  )
}

export default NotificationCategoryForm

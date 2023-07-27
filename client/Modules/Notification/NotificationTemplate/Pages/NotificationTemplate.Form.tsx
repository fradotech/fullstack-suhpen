import { NotificationTemplateCreateRequest } from '@server/modules/notification/notification-template/v1/notification-template.request'
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
import { NotificationCategoryAction } from '../../NotificationCategory/infrastructure/notification-category.action'
import { NotificationTemplateAction } from '../infrastructure/notification-template.action'

const NotificationTemplateForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<NotificationTemplateCreateRequest>()

  const fetch = async () => {
    setIsLoading(true)
    const res = await NotificationTemplateAction.findOne(id)
    form.setFieldsValue(res.data)
    setIsLoading(false)
  }

  useQuery([NotificationTemplateForm.name], id ? fetch : () => undefined, {
    refetchOnWindowFocus: false,
  })

  const {
    isLoading: isLoadingNotificationCategory,
    data: notificationCategories,
  } = NotificationCategoryAction.useIndex(
    { pageSize: 1000 },
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    if (id) await NotificationTemplateAction.update(id, data)
    else {
      const res = await NotificationTemplateAction.create(data)
      res.data && navigate(Path.notificationTemplate.index)
    }

    setIsLoading(false)
  }

  return (
    <>
      <PageHeader
        title={id ? 'NotificationTemplate' : 'New NotificationTemplate'}
        isLoading={isLoading || isLoadingNotificationCategory}
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
            <Col sm={24} md={6}>
              <FormItem
                name="thumbnail"
                input="attachment"
                total={1}
                form={form}
              />
            </Col>
            <Col sm={24} md={18}>
              <FormItem name="title" rules={[rule.required]} />
              <FormItem
                label="Category"
                name="categoryId"
                input="select"
                form={form}
                options={notificationCategories?.data}
              />
            </Col>
          </Row>

          <FormItem name="message" input="textArea" />
          <FormItem name="variables" input="textArea" />
        </FormContainer>
      </Section>
    </>
  )
}

export default NotificationTemplateForm

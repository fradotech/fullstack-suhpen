import { NotificationPushCreateRequest } from '@server/modules/notification/notification-push/v1/notification-push.request'
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
import { NotificationPushAction } from '../infrastructure/notification-push.action'

const NotificationPushForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<NotificationPushCreateRequest>()

  const fetch = async () => {
    setIsLoading(true)
    const res = await NotificationPushAction.findOne(id)
    form.setFieldsValue(res.data)
    setIsLoading(false)
  }

  useQuery([NotificationPushForm.name], id ? fetch : () => undefined, {
    refetchOnWindowFocus: false,
  })

  const { data: notificationCategories } = NotificationCategoryAction.useIndex(
    { pageSize: 1000 },
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()

    if (id) await NotificationPushAction.update(id, data)
    else {
      const res = await NotificationPushAction.create(data)
      res.data && navigate(Path.notificationPush.index)
    }

    setIsLoading(false)
  }

  return (
    <>
      <PageHeader title={id ? 'NotificationPush' : 'New NotificationPush'} />
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
              <Row gutter={12}>
                <Col sm={24} md={20}>
                  <FormItem
                    label="Category"
                    name="categoryId"
                    input="select"
                    form={form}
                    options={notificationCategories?.data}
                  />{' '}
                </Col>
                <Col sm={24} md={4}>
                  <FormItem
                    label="Broadcast"
                    name="isBroadcast"
                    input="switch"
                    form={form}
                    disabled={!!id}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <FormItem name="message" input="textArea" />
        </FormContainer>
      </Section>
    </>
  )
}

export default NotificationPushForm

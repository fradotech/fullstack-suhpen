import { ILogActivity } from '@server/modules/setting/logger/infrastructure/log-activity.interface'
import { Col, Form, Row } from 'antd'
import React from 'react'
import ReactJson from 'react-json-view'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../../Components/Molecules/Section/Section'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { rule } from '../../../../common/utils/form.rules'
import { LogActivityAction } from '../infrastructure/log-activity.action'

const LogActivityForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { id } = useParams()
  const [form] = Form.useForm<ILogActivity>()

  const fetch = async () => {
    setIsLoading(true)
    const res = await LogActivityAction.findOne(id)
    form.setFieldsValue(res.data)
    setIsLoading(false)
  }

  useQuery([LogActivityForm.name], id ? fetch : () => undefined, {
    refetchOnWindowFocus: false,
  })

  return (
    <>
      <PageHeader title={id ? 'LogActivity' : 'New LogActivity'} />
      <Section>
        <FormContainer
          form={form}
          layout="vertical"
          centered
          button={{ disabled: isLoading }}
          disabled
        >
          <Row gutter={12}>
            <Col sm={24} md={12}>
              <FormItem name="method" form={form} />
            </Col>
            <Col sm={24} md={12}>
              <FormItem name="path" rules={[rule.required]} />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col sm={24} md={12}>
              <FormItem name="executeTimeInMs" form={form} />
            </Col>
            <Col sm={24} md={12}>
              <FormItem name="remoteAddress" rules={[rule.required]} />
            </Col>
          </Row>
          <Form.Item label="User">
            <ReactJson src={form.getFieldValue('user')} />
          </Form.Item>
          <Form.Item label="Body">
            <ReactJson src={form.getFieldValue('body')} />
          </Form.Item>
        </FormContainer>
      </Section>
    </>
  )
}

export default LogActivityForm

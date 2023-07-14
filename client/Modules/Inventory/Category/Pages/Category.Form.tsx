import { CategoryCreateRequest } from '@server/modules/inventory/category/infrastructure/category.request'
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
import { CategoryAction } from '../infrastructure/category.action'

const CategoryForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<CategoryCreateRequest>()

  const fetch = async () => {
    setIsLoading(true)
    const res = await CategoryAction.findOne(id)
    form.setFieldsValue(res.data)
    setIsLoading(false)
  }

  useQuery([CategoryForm.name], id ? fetch : () => undefined, {
    refetchOnWindowFocus: false,
  })

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    if (id) await CategoryAction.update(id, data)
    else (await CategoryAction.create(data)) && navigate(Path.category.index)
    setIsLoading(false)
  }

  return (
    <>
      <PageHeader
        title={id ? 'Category' : 'New Category'}
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

export default CategoryForm

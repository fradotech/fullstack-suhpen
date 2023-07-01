import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { CategoryCreateRequest } from '@server/modules/feature/category/infrastructure/category.request'
import { CategoryResponse } from '@server/modules/feature/category/infrastructure/category.response'
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
import { CategoryAction } from '../infrastructure/category.action'

const CategoryForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<CategoryCreateRequest>()

  useQuery(
    [CategoryForm.name],
    id &&
      (async () => {
        setIsLoading(true)
        const res = await CategoryAction.findOne(id)
        form.setFieldsValue(res.data)
        setIsLoading(false)
      }),
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    let res: IApiRes<CategoryResponse>
    if (!id) res = await CategoryAction.create(data)
    if (id) res = await CategoryAction.update(id, data)
    setIsLoading(false)
    res.data && navigate(Route.category.index)
  }

  return (
    <>
      <PageHeader
        title={id ? 'Category Edit' : 'Category Create'}
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

export default CategoryForm

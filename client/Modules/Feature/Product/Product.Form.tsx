import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ProductCreateRequest } from '@server/modules/feature/product/infrastructure/product.request'
import { ProductResponse } from '@server/modules/feature/product/infrastructure/product.response'
import { Col, Form, Row } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import { Section } from '../../../Components/Molecules/Section/Section'
import FormContainer from '../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
import useCategories from '../Category/common/useCategories'
import { productAction } from './product.action'

const ProductForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<ProductCreateRequest>()
  const { isLoading: isLoadingCategories, data: categories } = useCategories()

  useQuery(
    [ProductForm.name],
    id &&
      (async () => {
        setIsLoading(true)
        const res = await productAction.findOne(id)
        form.setFieldsValue(res.data)
        setIsLoading(false)
      }),
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    let res: IApiRes<ProductResponse>
    if (!id) res = await productAction.create(data)
    if (id) res = await productAction.update(id, data)
    setIsLoading(false)
    res.data && navigate(Route.product.index)
  }

  return (
    <>
      <PageHeader
        title={id ? 'Product Edit' : 'Product Create'}
        isLoading={isLoading || isLoadingCategories}
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
              <FormItem name="upc" label="UPC" />
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
          <FormItem name="name" rules={[rule.required]} />
          <FormItem
            name="categoryIds"
            label="Categories"
            input="selectMultiple"
            options={categories?.data}
            disabled={!!id}
            form={form}
          />
          <FormItem name="description" input="textArea" />
          <Row gutter={12}>
            <Col sm={24} md={12}>
              <FormItem name="rating" />
            </Col>
            <Col sm={24} md={12}>
              <FormItem name="brand" />
            </Col>
          </Row>
        </FormContainer>
      </Section>
    </>
  )
}

export default ProductForm

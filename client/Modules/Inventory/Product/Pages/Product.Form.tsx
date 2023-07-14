import { ProductCreateRequest } from '@server/modules/inventory/product/infrastructure/product.request'
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
import { CategoryAction } from '../../Category/infrastructure/category.action'
import VariantIndex from '../../Variant/Pages/Variant.Index'
import { ProductAction } from '../infrastructure/product.action'

const ProductForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<ProductCreateRequest>()
  const { isLoading: isLoadingCategories, data: categories } =
    CategoryAction.useIndex()

  const fetch = async () => {
    setIsLoading(true)
    const res = await ProductAction.findOne(id)
    form.setFieldsValue(res.data)
    setIsLoading(false)
  }

  useQuery([ProductForm.name], id ? fetch : () => undefined, {
    refetchOnWindowFocus: false,
  })

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    if (id) await ProductAction.update(id, data)
    else (await ProductAction.create(data)) && navigate(Path.product.index)
    setIsLoading(false)
  }

  return (
    <>
      <PageHeader
        title={id ? 'Product' : 'New Product'}
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
            label="Categoryies"
            input="selectMultiple"
            options={categories?.data}
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

      <VariantIndex productId={id} />
    </>
  )
}

export default ProductForm

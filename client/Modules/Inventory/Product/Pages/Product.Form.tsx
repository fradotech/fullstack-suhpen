import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ProductCreateRequest } from '@server/modules/inventory/product/infrastructure/product.request'
import { ProductResponse } from '@server/modules/inventory/product/infrastructure/product.response'
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
import { ProductAction } from '../infrastructure/product.action'

interface IProps {
  isDetail?: boolean
}

const ProductForm: React.FC<IProps> = (props: IProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<ProductCreateRequest>()
  const { isLoading: isLoadingCategories, data: categories } =
    CategoryAction.useIndex()

  useQuery(
    [ProductForm.name],
    id
      ? async () => {
          setIsLoading(true)
          const res = await ProductAction.findOne(id)
          form.setFieldsValue(res.data)
          setIsLoading(false)
        }
      : () => undefined,
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    let res: IApiRes<ProductResponse> | undefined
    if (!id) res = await ProductAction.create(data)
    if (id) res = await ProductAction.update(id, data)
    setIsLoading(false)
    res?.data && navigate(Path.product.index)
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
          <FormItem
            isDetail={props.isDetail}
            name="thumbnail"
            input="attachment"
            total={1}
            form={form}
          />
          <Row gutter={12}>
            <Col sm={24} md={20}>
              <FormItem isDetail={props.isDetail} name="upc" label="UPC" />
            </Col>
            <Col sm={24} md={4}>
              <FormItem
                isDetail={props.isDetail}
                name="isActive"
                input="switch"
                rules={[rule.required]}
                form={form}
              />
            </Col>
          </Row>
          <FormItem
            isDetail={props.isDetail}
            name="name"
            rules={[rule.required]}
          />
          <FormItem
            isDetail={props.isDetail}
            name="categoryIds"
            label="Categoryies"
            input="selectMultiple"
            options={categories?.data}
            form={form}
          />
          <FormItem
            isDetail={props.isDetail}
            name="description"
            input="textArea"
          />
          <Row gutter={12}>
            <Col sm={24} md={12}>
              <FormItem isDetail={props.isDetail} name="rating" />
            </Col>
            <Col sm={24} md={12}>
              <FormItem isDetail={props.isDetail} name="brand" />
            </Col>
          </Row>
        </FormContainer>
      </Section>
    </>
  )
}

export default ProductForm

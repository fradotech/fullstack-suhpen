import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { ProductCreateRequest } from '@server/modules/feature/product/infrastructure/product.request'
import { ProductResponse } from '@server/modules/feature/product/infrastructure/product.response'
import { Form } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
import { productAction } from './product.action'

const ProductForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<ProductCreateRequest>()

  useQuery(
    [ProductForm.name],
    id &&
      (async () => {
        setIsLoading(true)
        const res = await productAction.findOne(id)
        form.setFieldsValue(res.data)
        setIsLoading(false)
      }),
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
        isLoading={isLoading}
      />
      <FormContainer
        onFinish={onFinish}
        form={form}
        layout="vertical"
        centered
        button={{ disabled: isLoading }}
      >
        <FormItem name="thumbnail" input="attachment" total={1} form={form} />
        <FormItem name="name" rules={[rule.required]} />
        <FormItem name="key" />
        <FormItem name="upc" />
        <FormItem name="description" input="textArea" />
        <FormItem
          name="categories"
          input="select"
          options={[
            { label: 'Category 1', value: 'Category 1' },
            { label: 'Category 2', value: 'Category 2' },
          ]}
        />
        <FormItem name="brand" />
        <FormItem name="rating" />
      </FormContainer>
    </>
  )
}

export default ProductForm

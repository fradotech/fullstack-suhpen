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
      <FormContainer
        onFinish={onFinish}
        form={form}
        layout="vertical"
        centered
        button={{ disabled: isLoading }}
      >
        <FormItem name="thumbnail" input="attachment" total={1} form={form} />
        <FormItem name="upc" />
        <FormItem name="name" rules={[rule.required]} />
        <FormItem name="key" rules={[rule.required]} />
        <FormItem name="description" input="textArea" />
        <FormItem
          name="isActive"
          input="switch"
          rules={[rule.required]}
          form={form}
        />
        <FormItem
          name="categories"
          input="selectMultiple"
          options={categories?.data}
          disabled={!!id}
          form={form}
        />
        <FormItem name="brand" />
        <FormItem name="rating" />
      </FormContainer>
    </>
  )
}

export default ProductForm

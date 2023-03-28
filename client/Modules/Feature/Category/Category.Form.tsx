import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { CategoryCreateRequest } from '@server/modules/feature/category/infrastructure/category.request'
import { CategoryResponse } from '@server/modules/feature/category/infrastructure/category.response'
import { Form } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../Enums/Route'
import { rule } from '../../../utils/form.rules'
import { categoryAction } from './category.action'

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
        const res = await categoryAction.findOne(id)
        form.setFieldsValue(res.data)
        setIsLoading(false)
      }),
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    let res: IApiRes<CategoryResponse>
    if (!id) res = await categoryAction.create(data)
    if (id) res = await categoryAction.update(id, data)
    setIsLoading(false)
    res.data && navigate(Route.category.index)
  }

  return (
    <>
      <PageHeader
        title={id ? 'Category Edit' : 'Category Create'}
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
        <FormItem name="key" rules={[rule.required]} />
        <FormItem name="description" input="textArea" />
        <FormItem name="isActive" input="switch" form={form} />
        <FormItem name="labelColor" input="colorPicker" />
      </FormContainer>
    </>
  )
}

export default CategoryForm

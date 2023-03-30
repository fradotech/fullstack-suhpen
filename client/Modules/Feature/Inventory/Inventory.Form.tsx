import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { InventoryCreateRequest } from '@server/modules/feature/inventory/infrastructure/inventory.request'
import { InventoryResponse } from '@server/modules/feature/inventory/infrastructure/inventory.response'
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
import { inventoryAction } from './inventory.action'

const InventoryForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm<InventoryCreateRequest>()
  const { id, productId } = useParams()

  useQuery(
    [InventoryForm.name],
    id &&
      (async () => {
        setIsLoading(true)
        const res = await inventoryAction.findOne(id)
        form.setFieldsValue(res.data)
        setIsLoading(false)
      }),
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    productId && (data.productId = productId)
    let res: IApiRes<InventoryResponse>
    if (!id) res = await inventoryAction.create(data)
    if (id) res = await inventoryAction.update(id, data)
    setIsLoading(false)
    res.data && navigate(Route.product.id(res.data.product.id))
  }

  return (
    <Section>
      <PageHeader
        title={id ? 'Inventory Edit' : 'Inventory Create'}
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
        <FormItem name="sku" />
        <FormItem name="productVariantName" />
        <Row gutter={12}>
          <Col sm={24} md={12} lg={12}>
            <FormItem
              name="buyPrice"
              rules={[rule.required]}
              input="inputRupiah"
            />
          </Col>
          <Col sm={24} md={12} lg={12}>
            <FormItem
              name="sellPrice"
              rules={[rule.required]}
              input="inputRupiah"
            />
          </Col>
          <Col sm={24} md={12} lg={12}>
            <FormItem
              name="stock"
              rules={[rule.required]}
              input="inputRupiah"
            />
          </Col>
          <Col sm={24} md={12} lg={12}>
            <FormItem name="stockMinimum" input="inputNumber" />
          </Col>
        </Row>
        <FormItem
          name="isActive"
          input="switch"
          rules={[rule.required]}
          form={form}
        />
        <FormItem name="discountPercentage" input="inputNumber" />
        <FormItem name="expiredDate" input="datePicker" />
      </FormContainer>
    </Section>
  )
}

export default InventoryForm

import { VariantCreateRequest } from '@server/modules/inventory/variant/infrastructure/variant.request'
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
import { VariantAction } from '../infrastructure/variant.action'

const VariantForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm<VariantCreateRequest>()
  const { id, productId } = useParams()

  const fetch = async () => {
    setIsLoading(true)
    const res = await VariantAction.findOne(id)
    form.setFieldsValue(res.data)
    setIsLoading(false)
  }

  useQuery([VariantForm.name], id ? fetch : () => undefined, {
    refetchOnWindowFocus: false,
  })

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    productId && (data.productId = productId)
    if (id) await VariantAction.update(id, data)
    else (await VariantAction.create(data)) && navigate(Path.product.index)
    setIsLoading(false)
  }

  return (
    <>
      <PageHeader
        title={id ? 'Variant' : 'New Variant'}
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
              <FormItem name="sku" label="SKU" />
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
          <FormItem name="variant" />
          <Row gutter={12}>
            <Col sm={24} md={12}>
              <FormItem
                name="buyPrice"
                rules={[rule.required]}
                input="inputRupiah"
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem
                name="sellPrice"
                rules={[rule.required]}
                input="inputRupiah"
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem
                name="stock"
                rules={[rule.required]}
                input="inputRupiah"
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem name="stockMinimum" input="inputNumber" />
            </Col>
            <Col sm={24} md={12}>
              <FormItem name="discountPercentage" input="inputPercentage" />
            </Col>
            <Col sm={24} md={12}>
              <FormItem name="expiredDate" input="datePicker" />
            </Col>
          </Row>
        </FormContainer>
      </Section>
    </>
  )
}

export default VariantForm

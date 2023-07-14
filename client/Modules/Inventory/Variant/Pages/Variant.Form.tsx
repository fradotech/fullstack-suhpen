import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { VariantCreateRequest } from '@server/modules/inventory/variant/infrastructure/variant.request'
import { VariantResponse } from '@server/modules/inventory/variant/infrastructure/variant.response'
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

interface IProps {
  isDetail?: boolean
}

const VariantForm: React.FC<IProps> = (props: IProps) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const [form] = Form.useForm<VariantCreateRequest>()
  const { id, productId } = useParams()

  useQuery(
    [VariantForm.name],
    id
      ? async () => {
          setIsLoading(true)
          const res = await VariantAction.findOne(id)
          form.setFieldsValue(res.data)
          setIsLoading(false)
        }
      : () => undefined,
    { refetchOnWindowFocus: false },
  )

  const onFinish = async () => {
    setIsLoading(true)
    const data = form.getFieldsValue()
    productId && (data.productId = productId)
    let res: IApiRes<VariantResponse> | undefined
    if (!id) res = await VariantAction.create(data)
    if (id) res = await VariantAction.update(id, data)
    setIsLoading(false)
    res?.data && navigate(Path.product.index)
  }

  return (
    <>
      <PageHeader
        title={id ? 'Variant Edit' : 'Variant Create'}
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
          <FormItem
            isDetail={props.isDetail}
            name="thumbnail"
            input="attachment"
            total={1}
            form={form}
          />
          <Row gutter={12}>
            <Col sm={24} md={20}>
              <FormItem isDetail={props.isDetail} name="sku" label="SKU" />
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
          <FormItem isDetail={props.isDetail} name="variant" />
          <Row gutter={12}>
            <Col sm={24} md={12}>
              <FormItem
                isDetail={props.isDetail}
                name="buyPrice"
                rules={[rule.required]}
                input="inputRupiah"
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem
                isDetail={props.isDetail}
                name="sellPrice"
                rules={[rule.required]}
                input="inputRupiah"
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem
                isDetail={props.isDetail}
                name="stock"
                rules={[rule.required]}
                input="inputRupiah"
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem
                isDetail={props.isDetail}
                name="stockMinimum"
                input="inputNumber"
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem
                isDetail={props.isDetail}
                name="discountPercentage"
                input="inputPercentage"
              />
            </Col>
            <Col sm={24} md={12}>
              <FormItem
                isDetail={props.isDetail}
                name="expiredDate"
                input="datePicker"
              />
            </Col>
          </Row>
        </FormContainer>
      </Section>
    </>
  )
}

export default VariantForm

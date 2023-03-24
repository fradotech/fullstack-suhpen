import { IApiRes } from '@server/infrastructure/interfaces/api-responses.interface'
import { InventoryCreateRequest } from '@server/modules/feature/inventory/infrastructure/inventory.request'
import { InventoryResponse } from '@server/modules/feature/inventory/infrastructure/inventory.response'
import { Form } from 'antd'
import React from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../../../Components/Molecules/Headers/PageHeader'
import FormContainer from '../../../../Components/Organisms/Form/FormContainer'
import FormItem from '../../../../Components/Organisms/Form/FormItem'
import { Route } from '../../../../Enums/Route'
import { rule } from '../../../../utils/form.rules'
import { inventoryAction } from './inventory.action'

const InventoryForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()
  const { id } = useParams()
  const [form] = Form.useForm<InventoryCreateRequest>()

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
    let res: IApiRes<InventoryResponse>
    if (!id) res = await inventoryAction.create(data)
    if (id) res = await inventoryAction.update(id, data)
    setIsLoading(false)
    res.data && navigate(Route.inventory.index)
  }

  return (
    <>
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
        <FormItem name="buyPrice" rules={[rule.required, { type: 'number' }]} />
        <FormItem
          name="sellPrice"
          rules={[rule.required, { type: 'number' }]}
        />
        <FormItem
          name="marginPrice"
          rules={[rule.required, { type: 'number' }]}
        />
      </FormContainer>
    </>
  )
}

export default InventoryForm

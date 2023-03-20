import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { ProductResponse } from '@server/modules/feature/product/infrastructure/product.response'
import { Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../../Enums/Route'
import { Util } from '../../../utils/util'
import { productAction } from './product.action'

export const productsColumns: ColumnsType<ProductResponse> = [
  {
    dataIndex: 'name',
  },
  {
    dataIndex: 'stock',
  },
  {
    dataIndex: 'price',
    render: (data: number) => (
      <Tag color="orange">
        <Typography.Text type="warning" strong>
          {Util.formatCurrency(data)}
        </Typography.Text>
      </Tag>
    ),
  },
  {
    title: 'Discount (%)',
    dataIndex: 'discountPercentage',
    render: (data: number) => `${data}%`,
  },
  {
    dataIndex: 'brand',
    render: (data: string) => {
      const color = ['blue', 'green', 'yellow', 'red', 'purple', 'orange']

      return (
        <Tag color={color[Math.floor(Math.random() * color.length)]}>
          {data}
        </Tag>
      )
    },
    filters: [
      { text: 'Apple', value: 'Apple' },
      { text: 'Oppo', value: 'Oppo' },
      { text: 'Samsung', value: 'Samsung' },
      { text: 'Vivo', value: 'Vivo' },
      { text: 'Xiaomi', value: 'Xiaomi' },
    ],
  },
  {
    title: 'Active',
    dataIndex: 'isActive',
    width: '1px',
    render: (data: boolean) =>
      data ? (
        <CheckCircleOutlined style={{ color: 'green' }} />
      ) : (
        <CloseCircleOutlined style={{ color: 'red' }} />
      ),
    filters: [
      { text: <CheckCircleOutlined style={{ color: 'green' }} />, value: 1 },
      { text: <CloseCircleOutlined style={{ color: 'red' }} />, value: 0 },
    ],
  },
  {
    dataIndex: 'createdAt',
    render: (data: Date) => Util.formatDate(data),
  },
  {
    title: 'Actions',
    width: '75px',
    render: (data: ProductResponse) => (
      <RowActionButtons
        actions={[
          {
            type: 'view',
            href: Route.product.id(data.id),
          },
          {
            type: 'edit',
            href: Route.product.edit(data.id),
          },
          {
            type: 'delete',
            onClick: async () => {
              ;(await productAction.remove(data.id)) && location.reload()
            },
          },
        ]}
      />
    ),
  },
]

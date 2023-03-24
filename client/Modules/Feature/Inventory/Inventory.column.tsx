import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { InventoryResponse } from '@server/modules/feature/inventory/infrastructure/inventory.response'
import { IProduct } from '@server/modules/feature/product/infrastructure/product.interface'
import { Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../../Enums/Route'
import { Util } from '../../../utils/util'
import { inventoryAction } from './inventory.action'

export const inventoryColumns: ColumnsType<InventoryResponse> = [
  {
    title: 'SKU',
    dataIndex: 'sku',
  },
  {
    dataIndex: 'product',
    render: (data: IProduct) => data?.name,
  },
  {
    dataIndex: 'stock',
  },
  {
    dataIndex: 'buyPrice',
    render: (data: number) => (
      <Typography.Text type="warning" strong>
        {Util.formatCurrency(data)}
      </Typography.Text>
    ),
  },
  {
    dataIndex: 'sellPrice',
    render: (data: number) => (
      <Typography.Text type="success" strong>
        {Util.formatCurrency(data)}
      </Typography.Text>
    ),
  },
  {
    dataIndex: 'marginPrice',
    render: (data: number) => (
      <Tag>
        <Typography.Text strong>{Util.formatCurrency(data)}</Typography.Text>
      </Tag>
    ),
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
    render: (data: InventoryResponse) => (
      <RowActionButtons
        actions={[
          {
            type: 'view',
            href: Route.inventory.id(data.id),
          },
          {
            type: 'edit',
            href: Route.inventory.edit(data.id),
          },
          {
            type: 'delete',
            onClick: async () => {
              ;(await inventoryAction.remove(data.id)) && location.reload()
            },
          },
        ]}
      />
    ),
  },
]

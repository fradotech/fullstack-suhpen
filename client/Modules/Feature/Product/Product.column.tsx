import { ProductResponse } from '@server/modules/feature/product/infrastructure/product.response'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../../Enums/Route'
import { Utils } from '../../../utils/utils'
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
  },
  {
    title: 'Discount (%)',
    dataIndex: 'discountPercentage',
    render: (data: number) => `${data}%`,
  },
  {
    dataIndex: 'brand',
  },
  {
    dataIndex: 'createdAt',
    render: (data: Date) => Utils.formatDate(data),
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

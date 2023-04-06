import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { CategoryResponse } from '@server/modules/feature/category/infrastructure/category.response'
import { ProductResponse } from '@server/modules/feature/product/infrastructure/product.response'
import { Row, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../../Enums/Route'
import { Util } from '../../../utils/util'
import { productAction } from './product.action'

export const productColumns = (
  optionsCategory: CategoryResponse[],
): ColumnsType<ProductResponse> => {
  return [
    {
      dataIndex: 'name',
    },
    {
      dataIndex: 'categories',
      render: (data: CategoryResponse[]) => (
        <Row>
          {data?.map((data) => (
            <Tag color={data.labelColor}>{data.name}</Tag>
          ))}
        </Row>
      ),
      filters: optionsCategory?.map((data) => {
        return {
          text: data.name,
          value: data.name,
        }
      }),
    },
    {
      dataIndex: 'brand',
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
      ],
    },
    {
      dataIndex: 'createdAt',
      render: (data: Date) => Util.formatDate(data),
    },
    {
      title: 'Actions',
      width: '120px',
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
}

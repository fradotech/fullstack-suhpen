import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { CategoryResponse } from '@server/modules/feature/category/infrastructure/category.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React from 'react'
import { RowActionButtons } from '../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Route } from '../../../Enums/Route'
import { Util } from '../../../utils/util'
import { categoryAction } from './category.action'
export const categoryColumns: ColumnsType<CategoryResponse> = [
  {
    dataIndex: 'key',
  },
  {
    title: 'name',
    render: (data: CategoryResponse) => {
      return <Tag color={data.labelColor}>{data.name}</Tag>
    },
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
    width: '75px',
    render: (data: CategoryResponse) => (
      <RowActionButtons
        actions={[
          {
            type: 'view',
            href: Route.category.id(data.id),
          },
          {
            type: 'edit',
            href: Route.category.edit(data.id),
          },
          {
            type: 'delete',
            onClick: async () => {
              ;(await categoryAction.remove(data.id)) && location.reload()
            },
          },
        ]}
      />
    ),
  },
]

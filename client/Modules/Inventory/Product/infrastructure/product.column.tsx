import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { CategoryResponse } from '@server/modules/inventory/category/infrastructure/category.response'
import { ProductResponse } from '@server/modules/inventory/product/infrastructure/product.response'
import { Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'
import { RowActionButtons } from '../../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Path } from '../../../../common/Path'
import { Util } from '../../../../common/utils/util'
import { ProductAction } from './product.action'

export const productColumns = (
  optionsCategory: CategoryResponse[] | undefined,
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<
    QueryObserverResult<IPaginateResponse<ProductResponse>, unknown>
  >,
): ColumnsType<ProductResponse> => {
  return [
    {
      dataIndex: 'name',
    },
    {
      dataIndex: 'categories',
      render: (data: CategoryResponse[]) => {
        return data?.map((data) => {
          return (
            <Tag key={data.id} color={data.labelColor}>
              {data.name}
            </Tag>
          )
        })
      },
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
              href: Path.product.id(data.id),
            },
            {
              type: 'edit',
              href: Path.product.edit(data.id),
            },
            {
              type: 'delete',
              onClick: async () => {
                await ProductAction.delete(data.id)
                await refetch()
              },
            },
          ]}
        />
      ),
    },
  ]
}

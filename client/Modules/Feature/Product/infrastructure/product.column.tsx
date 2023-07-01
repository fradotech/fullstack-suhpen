import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { CategoryResponse } from '@server/modules/feature/category/infrastructure/category.response'
import { ProductResponse } from '@server/modules/feature/product/infrastructure/product.response'
import { Row, Tag } from 'antd'
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
  optionsCategory: CategoryResponse[],
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

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { IPaginateResponse } from '@server/infrastructure/index/index.interface'
import { IProduct } from '@server/modules/feature/product/infrastructure/product.interface'
import { VariantResponse } from '@server/modules/feature/variant/infrastructure/variant.response'
import { Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'
import { Link } from 'react-router-dom'
import { RowActionButtons } from '../../../../Components/Molecules/RowActionButtons/RowActionButtons'
import { Path } from '../../../../common/Path'
import { Util } from '../../../../common/utils/util'
import { VariantAction } from './variant.action'

export const variantColumns = (
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<
    QueryObserverResult<IPaginateResponse<VariantResponse>, unknown>
  >,
): ColumnsType<VariantResponse> => {
  return [
    { dataIndex: 'sku' },
    {
      dataIndex: 'product',
      render: (data: IProduct) => (
        <Link to={Path.product.id(data?.id)}>{data?.name}</Link>
      ),
    },
    { dataIndex: 'name' },
    { dataIndex: 'stock' },
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
      dataIndex: 'expiredDate',
      render: (data: Date) => Util.formatDate(data),
    },
    {
      dataIndex: 'createdAt',
      render: (data: Date) => Util.formatDate(data),
    },
    {
      title: 'Actions',
      width: '120px',
      render: (data: VariantResponse) => (
        <RowActionButtons
          actions={[
            {
              type: 'view',
              href: Path.variant.id(data.id),
            },
            {
              type: 'edit',
              href: Path.variant.edit(data.id),
            },
            {
              type: 'delete',
              onClick: async () => {
                await VariantAction.delete(data.id)
                await refetch()
              },
            },
          ]}
        />
      ),
    },
  ]
}

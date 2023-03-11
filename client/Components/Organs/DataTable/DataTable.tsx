import { IPaginationMeta } from '@server/infrastructure/index/index.interface'
import { Pagination, PaginationProps, Space, Table } from 'antd'
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface'
import React, { useState } from 'react'
import Loading from '../../../Components/Molecules/Loading/Loading'
import { Utils } from '../../../utils/utils'
import { FilterState, IDataTableProps, TOnSort } from './DataTable.interface'
import styles from './DataTable.module.css'
import DataTableHeader from './DataTableHeader'

const tableLayout: React.CSSProperties = { width: '100%' }

// eslint-disable-next-line @typescript-eslint/naming-convention
function DataTable<T extends object = any>(
  props: IDataTableProps<T>,
): JSX.Element {
  const [state, setState] = useState<FilterState<T>>({ search: props.search })
  const { onChange } = props

  const handlePageChange: PaginationProps['onChange'] = (page, pageSize) => {
    setState({ ...state, page, pageSize, per_page: pageSize })
    onChange({ ...state, page, pageSize, per_page: pageSize })
  }

  const handleSearch = (value: string) => {
    setState({ ...state, page: 1, search: value })
    onChange({ ...state, page: 1, search: value })
  }

  const handleTableChange = (
    filters: Record<string, FilterValue>,
    sorter: TOnSort<T>,
  ) => {
    const newQuery = {
      ...state,
      filters,
      sortField: String(sorter.field),
      sortOrder: sorter.order,
    }

    setState(newQuery)
    onChange(newQuery)
  }

  const columns: ColumnsType<T> = props.columns.map((data) => {
    return {
      ...data,
      title: data.title || Utils.titleCase(data['dataIndex'] || ''),
      sorter: data.title != 'Actions' ? () => 0 : null,
      sortDirections: ['ascend', 'descend'],
    }
  })

  return (
    <>
      <Loading isLoading={props.loading} />
      <DataTableHeader {...props.dataTableHeader} onSearch={handleSearch} />
      <Space.Compact direction="vertical" style={tableLayout}>
        <Table<T>
          {...props}
          columns={columns}
          style={tableLayout}
          size="small"
          pagination={false}
          onChange={(pagination, filters, sorter: SorterResult<T>): void => {
            handleTableChange(filters, {
              ...sorter,
              order: sorter.order
                ? sorter.order == 'ascend'
                  ? 'ASC'
                  : 'DESC'
                : undefined,
            })
          }}
        />

        <div className={styles.pagination}>
          {props.pagination && !!props.pagination?.total && (
            <Pagination
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              defaultCurrent={props.defaultCurrent || 1}
              showSizeChanger
              onChange={handlePageChange}
              {...props.pagination}
            />
          )}
        </div>
      </Space.Compact>
    </>
  )
}

export const paginationTransform = (
  meta: IPaginationMeta,
): TablePaginationConfig => {
  return {
    current: meta?.page,
    total: meta?.total,
    pageSize: meta?.pageSize,
  }
}

export default DataTable

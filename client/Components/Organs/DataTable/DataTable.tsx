import React, { useState } from 'react'

import { IPaginationMeta } from '@server/infrastructure/index/index.interface'
import { Pagination, PaginationProps, Space, Table } from 'antd'
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface'
import { FilterState, IDataTableProps, TOnSort } from './DataTable.interface'
import styles from './DataTable.module.css'
import DataTableHeader from './DataTableHeader'

const tableLayout: React.CSSProperties = { width: '100%' }

// eslint-disable-next-line @typescript-eslint/naming-convention
function DataTable<T extends object = any>(
  props: IDataTableProps<T>,
): JSX.Element {
  const {
    pagination,
    defaultCurrent,
    dataTableHeader: filters,
    onChange,
    search,
    ...rest
  } = props

  const [state, setState] = useState<FilterState<T>>({ search })

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

  return (
    <>
      <DataTableHeader {...filters} onSearch={handleSearch} />
      <Space.Compact direction="vertical" style={tableLayout}>
        <Table<T>
          {...rest}
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
          {pagination && !!pagination?.total && (
            <Pagination
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              defaultCurrent={defaultCurrent || 1}
              showSizeChanger
              onChange={handlePageChange}
              {...pagination}
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

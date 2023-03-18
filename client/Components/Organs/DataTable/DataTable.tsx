import { IPaginationMeta } from '@server/infrastructure/index/index.interface'
import { Col, Pagination, PaginationProps, Space, Table } from 'antd'
import {
  ColumnsType,
  FilterValue,
  SorterResult,
  TablePaginationConfig,
} from 'antd/es/table/interface'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Loading from '../../../Components/Molecules/Loading/Loading'
import { Utils } from '../../../utils/utils'
import { FilterState, IDataTableProps, TOnSort } from './DataTable.interface'
import styles from './DataTable.module.css'
import DataTableHeader from './DataTableHeader'

// eslint-disable-next-line @typescript-eslint/naming-convention
function DataTable<T extends object>(props: IDataTableProps<T>): JSX.Element {
  const [params] = useSearchParams()
  const [state, setState] = useState<FilterState<T>>({ search: props.search })
  const { onChange } = props

  const handlePageChange: PaginationProps['onChange'] = (page, pageSize) => {
    setState({ ...state, page, pageSize })
    onChange({ ...state, page, pageSize })
  }

  const handleSearch = (search: string) => {
    const page = search ? 1 : +params.get('page') || 1
    const pageSize = search ? 100000 : 10

    setState({ ...state, page, pageSize, search })
    onChange({ ...state, page, pageSize, search })
  }

  const handleDateRange = (dateRange: [dayjs.Dayjs, dayjs.Dayjs]) => {
    const startAt = dateRange?.[0]?.toISOString()
    const endAt = dateRange?.[1]?.toISOString()

    setState({ ...state, startAt, endAt })
    onChange({ ...state, startAt, endAt })
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
      <DataTableHeader
        {...props.dataTableHeader}
        onSearch={handleSearch}
        onDateRange={handleDateRange}
      />
      <Space.Compact direction="vertical" className={styles.tableLayout}>
        <Table<T>
          {...props}
          columns={columns}
          className={styles.tableLayout}
          size="small"
          pagination={false}
          onChange={(pagination, filters, sorter: SorterResult<T>): void => {
            handleTableChange(filters, {
              ...sorter,
              order: sorter.order && sorter.order == 'ascend' ? 'ASC' : 'DESC',
            })
          }}
        />

        <Col className={styles.pagination}>
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
        </Col>
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

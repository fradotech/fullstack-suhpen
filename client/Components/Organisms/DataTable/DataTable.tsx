import { IBaseEntity } from '@server/infrastructure/base/base-entity.interface'
import { IPaginationMeta } from '@server/infrastructure/index/index.interface'
import { Col, Pagination, PaginationProps, Row, Space, Table } from 'antd'
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
import DataTableCard from './DataTableCard'
import DataTableHeader from './DataTableHeader'

const DataTable: React.FC<IDataTableProps<IBaseEntity>> = <
  T extends IBaseEntity,
>(
  props: IDataTableProps<T>,
): JSX.Element => {
  const [params] = useSearchParams()
  const [state, setState] = useState<FilterState<T>>({ search: props.search })
  const [isCard, setIsCard] = useState(false)
  const { onChange } = props

  const handlePageChange: PaginationProps['onChange'] = (page, pageSize) => {
    const newQuery = { ...state, page, pageSize }

    setState(newQuery)
    onChange(newQuery)
  }

  const handleSearch = (search: string) => {
    const page = search ? 1 : +params.get('page') || 1
    const pageSize = search ? 100000 : 10
    const newQuery = { ...state, page, pageSize, search }

    setState(newQuery)
    onChange(newQuery)
  }

  const handleDateRange = (dateRange: [dayjs.Dayjs, dayjs.Dayjs]) => {
    const startAt = dateRange?.[0]?.toISOString()
    const endAt = dateRange?.[1]?.toISOString()

    const newQuery = { ...state, startAt, endAt }

    setState(newQuery)
    onChange(newQuery)
  }

  const handleTableChange = (
    filters: Record<string, FilterValue>,
    sorter: TOnSort<T>,
  ) => {
    const sortField = String(sorter.field)
    const sortOrder = sorter.order

    const newQuery = { ...state, filters, sortField, sortOrder }

    setState(newQuery)
    onChange(newQuery)
  }

  const columns: ColumnsType<T> = props.columns.map((data) => {
    return {
      ...data,
      title: data.title || Utils.titleCase(data['dataIndex'] || ''),
      sorter: data.title != 'Actions' && (() => 0),
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
        isCard={isCard}
        setIsCard={setIsCard}
      />
      <Space.Compact direction="vertical" className={styles.tableLayout}>
        {isCard ? (
          <Row style={{ paddingTop: '12px' }}>
            <DataTableCard
              data={props?.dataSource as unknown as IBaseEntity[]}
            />
          </Row>
        ) : (
          <Table<T>
            {...props}
            columns={columns}
            className={styles.tableLayout}
            size="small"
            pagination={false}
            onChange={(pagination, filters, sorter: SorterResult<T>): void => {
              handleTableChange(filters, {
                ...sorter,
                order:
                  sorter.order && sorter.order == 'ascend' ? 'ASC' : 'DESC',
              })
            }}
          />
        )}

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

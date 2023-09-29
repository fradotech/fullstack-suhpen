import { IPaginationMeta } from '@server/infrastructure/index/index.interface'
import { TablePaginationConfig } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { SortOrder } from 'antd/es/table/interface'
import { Util } from '../../../common/utils/util'

export const formatPagination = (
  meta: IPaginationMeta | undefined,
): TablePaginationConfig => {
  return {
    current: meta?.page,
    total: meta?.total,
    pageSize: meta?.pageSize,
  }
}

export const formatColumns = <T>(columns: ColumnsType<T> | undefined) => {
  return columns?.map((data) => {
    return {
      ...data,
      key: data.key || data['dataIndex'] || data.title,
      title: data.title || Util.titleCase(data['dataIndex'] || ''),
      sorter: data.title != 'Actions' && (() => 0),
      sortDirections: ['ascend', 'descend'] as SortOrder[],
    }
  })
}

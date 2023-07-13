import { IndexSortOderEnum } from '@server/infrastructure/index/index.interface'
import {
  MenuDividerType,
  MenuItemGroupType,
  MenuItemType,
  SubMenuType,
} from 'antd/es/menu/hooks/useItems'
import type { TableProps } from 'antd/es/table'
import { ColumnType, SorterResult } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import React from 'react'

export type TOrder = {
  order: IndexSortOderEnum | undefined
}

export type TOnSort<T> = Omit<SorterResult<T>, 'order'> & TOrder

export declare type MenuClickEventHandler = (
  info: MenuInfo,
  selectedRowKeys?: React.Key[],
) => void

export type MenuInfo = {
  key: string
  keyPath: string[]
  item: React.ReactInstance
  domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>
}

export interface IMenuItemType extends Omit<MenuItemType, 'onClick'> {
  onClick?: MenuClickEventHandler
}
export interface ISubMenuType extends Omit<SubMenuType, 'onClick'> {
  onClick?: MenuClickEventHandler
}
export type ItemType =
  | IMenuItemType
  | ISubMenuType
  | MenuItemGroupType
  | MenuDividerType
  | null

export type FilterState<T> = {
  [key: string]: any
  search?: string
  column?: ColumnType<T>
  order?: 'DESC' | 'ASC' | null
  field?: React.Key | readonly React.Key[]
  sort?: string
  total?: number
  page?: number
  perPage?: number
}

export interface IDataTableHeader {
  search?: boolean
  dateRangeColumn?: string
  showCard?: boolean
  setShowCard?: React.Dispatch<React.SetStateAction<boolean>>
  onSearch?: (value?: string) => void
  onDateRange?: (dateRange: [dayjs.Dayjs, dayjs.Dayjs]) => void
  searchValue?: string
  query?: Record<string, any>
  hrefCreate?: string
  hrefExport?: string
}

export interface IDataTableProps<T> extends Omit<TableProps<T>, 'onChange'> {
  defaultCurrent?: number
  batchActionMenus?: ItemType[]
  dataTableHeader?: IDataTableHeader
  search?: string
  onChange: (filters: FilterState<T>) => void
}

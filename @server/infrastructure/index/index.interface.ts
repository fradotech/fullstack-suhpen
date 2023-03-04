import { OrderDirectionType } from '@server/infrastructure/index/index.enum'

export interface ISortRequest {
  sortField?: string
  sortOrder?: OrderDirectionType
}

export interface IPaginateRequest {
  pageSize?: number
  page?: number
}

// Index Response

export interface IPaginationMeta {
  page: number
  pageSize: number
  total: number
  totalPage: number
}

export interface IPaginateResponse<T> {
  meta: IPaginationMeta
  data: Array<T>
  dataExport?: Array<T>
}

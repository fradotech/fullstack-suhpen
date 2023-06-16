import { OrderDirectionEnum } from './index.enum'

export interface ISortRequest {
  sortField?: string
  sortOrder?: OrderDirectionEnum
}

export interface IPaginateRequest {
  pageSize?: number
  page?: number
}

export interface IPaginationMeta {
  page: number
  pageSize: number
  total: number
  totalPage: number
}

export interface IPaginateResponse<T> {
  meta: IPaginationMeta
  data: Array<T>
}

export interface IIndexAppRelation {
  name: string
  columns?: string[]
  relations?: IIndexAppRelation[]
}

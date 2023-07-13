import { IndexRequest } from '@server/infrastructure/index/index.request'
import React from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'

export type TPropsTableFilter<T> = IndexRequest & T

export const paramDefaultValue = {
  page: 1,
  pageSize: 10,
}

export const useDataTable = <T>() => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = React.useState<TPropsTableFilter<T>>(() => {
    const queryParams = {} as TPropsTableFilter<T>
    for (const [key, value] of searchParams.entries()) queryParams[key] = value

    !queryParams.page && (queryParams.page = paramDefaultValue.page)
    !queryParams.pageSize && (queryParams.pageSize = paramDefaultValue.pageSize)

    delete queryParams.filters
    delete queryParams.search
    delete queryParams.sortField
    delete queryParams.sortOrder

    return queryParams
  })

  const existingParams = React.useMemo(() => {
    const queryParams = Object.keys(query).reduce(
      (a, c) => (query[c] ? { ...a, [c]: query[c] } : a),
      {} as TPropsTableFilter<T>,
    )

    delete queryParams.filters
    delete queryParams.search
    delete queryParams.sortField
    delete queryParams.sortOrder

    setSearchParams(queryParams as URLSearchParamsInit)
    return queryParams
  }, [query, setSearchParams])

  return {
    query,
    setQueryParams: (propsParams: TPropsTableFilter<T>) => {
      const queryParams = {
        ...existingParams,
        ...propsParams,
      }
      setQuery(queryParams)
    },
  }
}

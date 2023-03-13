import { IndexRequest } from '@server/infrastructure/index/index.request'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

export type TPropsTableFilter<T> = IndexRequest & T

export const useDataTable = <T>() => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = React.useState<TPropsTableFilter<T> | any>(() => {
    const queryParams = {}
    for (const [key, value] of searchParams.entries()) queryParams[key] = value
    return queryParams
  })

  const existingParams = React.useMemo(() => {
    const queryParams = Object.keys(query).reduce(
      (a, c) => (query[c] ? { ...a, [c]: query[c] } : a),
      {},
    )

    setSearchParams(queryParams)
    return queryParams
  }, [query]) as TPropsTableFilter<T>

  return {
    setQueryParams: (propsParams: TPropsTableFilter<T>) => {
      const queryParams = {
        ...existingParams,
        ...propsParams,
      } as TPropsTableFilter<T>
      !queryParams.sortOrder && delete queryParams.sortField
      setQuery(queryParams)
    },

    query,
  }
}

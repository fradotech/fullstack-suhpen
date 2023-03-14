import { IndexRequest } from '@server/infrastructure/index/index.request'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

export type TPropsTableFilter<T> = IndexRequest & T

export const useDataTable = <T>() => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = React.useState<TPropsTableFilter<T> | any>(() => {
    const queryParams = {} as TPropsTableFilter<T>
    for (const [key, value] of searchParams.entries()) queryParams[key] = value

    delete queryParams.filters
    delete queryParams.search

    return queryParams
  })

  const existingParams = React.useMemo(() => {
    const queryParams = Object.keys(query).reduce(
      (a, c) => (query[c] ? { ...a, [c]: query[c] } : a),
      {} as TPropsTableFilter<T>,
    )

    delete queryParams.filters
    delete queryParams.search

    setSearchParams(queryParams as any)
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

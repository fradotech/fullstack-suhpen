import { useQuery } from 'react-query'
import { categoryAction } from '../category.action'

const useCategories = () => {
  const fetchCategories = async () =>
    await categoryAction.fetch({ pageSize: 100000 })
  const { isLoading, data } = useQuery(
    [useCategories.name + '/categories'],
    fetchCategories,
  )

  return { isLoading, data }
}

export default useCategories

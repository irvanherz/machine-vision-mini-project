import QueryString from 'qs'
import { useLocation } from 'react-router-dom'

export default function useQueryFilters () {
  const { search } = useLocation()

  const filters = QueryString.parse(search, { ignoreQueryPrefix: true }) || {}
  return [filters]
}

import { Pagination, Space } from 'antd'
import qs from 'qs'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import ContentGateway from '../../components/ContentGateway'
import PostCardGridList from '../../components/PostCardGridList'
import StandardLayout from '../../components/StandardLayout'
import useQueryFilters from '../../hooks/useQueryFilters'
import { ApiData, ApiError } from '../../libs/api'
import PostService from '../../services/post'

export default function Home () {
  const [filters] = useQueryFilters()
  const navigate = useNavigate()
  const { data, status, error } = useQuery<ApiData, ApiError>(['post.list', filters.page], () => PostService.findMany({ page: filters.page }))
  const posts = data?.data || []
  const meta = data?.meta || {}
  const totalPages = Math.ceil(meta.total / (meta.limit || 1))

  const handleChangePage = (page: any) => {
    const q = { ...filters, page: page - 1 }
    navigate(qs.stringify(q, { addQueryPrefix: true }), { replace: true })
  }

  return (
    <StandardLayout>
      <ContentGateway data={data} error={error} status={status}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <PostCardGridList posts={posts} />
          <Pagination
            style={{ textAlign: 'center' }}
            current={meta.page + 1}
            total={totalPages}
            onChange={handleChangePage}
          />
        </Space>
      </ContentGateway>
    </StandardLayout>
  )
}

import { PlusOutlined } from '@ant-design/icons'
import { Button, notification, Pagination, Space, Table } from 'antd'
import QueryString from 'qs'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import ContentGateway from '../../components/ContentGateway'
import PostCreateButton from '../../components/PostCreateButton'
import PostDeleteButton from '../../components/PostDeleteButton'
import PostDetailsButton from '../../components/PostDetailsButton'
import PostEditButton from '../../components/PostEditButton'
import StandardLayout from '../../components/StandardLayout'
import useQueryFilters from '../../hooks/useQueryFilters'
import PostService from '../../services/post'
import PostImage from './PostImage'

const { Column } = Table

type PostType = {
  id: any
  text: string
  tags: string[]
  image: string
  owner: {
    firstName: string
    lastName: string
  }
}

export default function PostManager () {
  const [filters] = useQueryFilters()
  const navigate = useNavigate()
  const { data, refetch, error, status } = useQuery(['post.list', filters.page], () => PostService.findMany({ page: filters.page }))
  const posts: any[] = data?.data || []
  const meta = data?.meta || {}
  const totalPages = Math.ceil(meta.total / (meta.limit || 1))

  const handleAfterUpdated = () => {
    notification.success({
      message: 'Success',
      description: 'Post updated successfully',
      duration: 3
    })
    refetch()
  }

  const handleAfterDeleted = () => {
    notification.success({
      message: 'Success',
      description: 'Post deleted successfully',
      duration: 3
    })
    refetch()
  }

  const handleAfterCreated = () => {
    notification.success({
      message: 'Success',
      description: 'User created successfully',
      duration: 3
    })
    refetch()
  }

  const handleChangePage = (page: any) => {
    const q = { ...filters, page: page - 1 }
    navigate(QueryString.stringify(q, { addQueryPrefix: true }), { replace: true })
  }

  return (
    <StandardLayout
      headerExtra={<PostCreateButton afterCreated={handleAfterCreated}><Button icon={<PlusOutlined />}>Create New Post</Button></PostCreateButton>}
    >
      <ContentGateway data={data} error={error} status={status}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Table dataSource={posts} pagination={false} style={{ minWidth: 500, overflowX: 'auto' }}>
            <Column
              title="Text"
              dataIndex="text"
              key="text"
            />
            <Column
              title="Tags"
              dataIndex="tags"
              key="tags"
              render={(_, post: PostType) => (
                post.tags.join(', ')
              )}
            />
            <Column
              title="Image"
              dataIndex="image"
              key="image"
              render={(_, post: PostType) => (
                <PostImage src={post?.image} style={{ minWidth: 96, maxWidth: 128 }}/>
              )}
            />
            <Column
              title="User"
              key="user"
              render={(_, post: PostType) => (
              `${post?.owner?.firstName} ${post?.owner?.lastName}`
              )}
            />
            <Column
              title="Action"
              key="action"
              render={(_, post: PostType) => (
                <Space size="middle">
                  <PostDetailsButton postId={post.id}><a>View</a></PostDetailsButton>
                  <PostEditButton postId={post.id} afterUpdated={handleAfterUpdated}><a>Edit</a></PostEditButton>
                  <PostDeleteButton post={post} afterDeleted={handleAfterDeleted}><a>Delete</a></PostDeleteButton>
                </Space>
              )}
            />
          </Table>
          <Pagination
            style={{ textAlign: 'center', display: meta.total ? 'block' : 'none' }}
            current={meta.page + 1}
            total={totalPages}
            onChange={handleChangePage}
          />
        </Space>
      </ContentGateway>
    </StandardLayout>
  )
}
